package usc.choiceanalyst.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import usc.choiceanalyst.model.ModeloEstablecimiento;
import usc.choiceanalyst.model.ModeloExperimento;
import usc.choiceanalyst.model.ModeloUsuario;
import usc.choiceanalyst.repository.RepositorioEstablecimiento;
import usc.choiceanalyst.repository.RepositorioExperimento;

import java.net.URI;
import java.text.Normalizer;
import java.text.SimpleDateFormat;
import java.util.Collection;
import java.util.Date;
import java.util.Optional;

@RestController
@RequestMapping("establecimientos")
public class ControladorEstablecimiento {

    private RepositorioEstablecimiento dbes;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public ControladorEstablecimiento(RepositorioEstablecimiento dbes, PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
        this.dbes = dbes;

    }

    @PreAuthorize("permitAll()")
    @GetMapping(
            path = "/{idEstablecimiento}",
            produces = {MediaType.APPLICATION_JSON_UTF8_VALUE, MediaType.APPLICATION_XML_VALUE}
    )
    public ResponseEntity<ModeloEstablecimiento> getEstablecimiento(@PathVariable("idEstablecimiento") String idEstablecimiento) {
        if (dbes.existsByIdEstablecimiento(idEstablecimiento)) {
            return ResponseEntity.ok().body(dbes.findByIdEstablecimiento(idEstablecimiento).get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @PreAuthorize("permitAll()")
    @GetMapping(
            produces = {MediaType.APPLICATION_JSON_UTF8_VALUE, MediaType.APPLICATION_XML_VALUE}
    )
    public ResponseEntity<Collection<ModeloEstablecimiento>> getAllEstablecimientos() {
        return ResponseEntity.ok(dbes.findAll());
    }


    @PreAuthorize("permitAll()")
    @DeleteMapping(path = "/{idEstablecimiento}")
    public ResponseEntity deleteEstablecimiento(@PathVariable("idEstablecimiento") String idEstablecimiento) {
        if (!dbes.existsByIdEstablecimiento(idEstablecimiento)) {
            return ResponseEntity.notFound().build();
        } else {
            dbes.deleteByIdEstablecimiento(idEstablecimiento);
            return ResponseEntity.noContent().build();
        }
    }

    @PreAuthorize("permitAll()")
    @PostMapping(
            produces = {MediaType.APPLICATION_JSON_UTF8_VALUE, MediaType.APPLICATION_XML_VALUE},
            consumes = {MediaType.APPLICATION_JSON_UTF8_VALUE, MediaType.APPLICATION_XML_VALUE}
    )

    public ResponseEntity createEstablecimiento(@RequestBody ModeloEstablecimiento establecimiento) {
        if (dbes.existsByIdEstablecimiento(establecimiento.getIdEstablecimiento())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        } else {

            establecimiento.setIdEstablecimiento(establecimiento.getNombre());
            dbes.save(establecimiento);

            URI location = ServletUriComponentsBuilder.fromCurrentContextPath().path("/establecimientos/{idEstablecimiento}").buildAndExpand(establecimiento.getIdEstablecimiento()).toUri();
            return ResponseEntity.created(location).body(establecimiento.getIdEstablecimiento());
        }
    }



}
