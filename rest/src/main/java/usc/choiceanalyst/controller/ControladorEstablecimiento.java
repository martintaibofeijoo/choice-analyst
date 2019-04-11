package usc.choiceanalyst.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import usc.choiceanalyst.model.ModeloEstablecimiento;
import usc.choiceanalyst.model.auxiliar.Menu;
import usc.choiceanalyst.repository.RepositorioEstablecimiento;

import java.net.URI;
import java.util.Collection;

@RestController
@RequestMapping("establecimientos")
public class ControladorEstablecimiento {

    private RepositorioEstablecimiento dbes;


    @Autowired
    public ControladorEstablecimiento(RepositorioEstablecimiento dbes) {
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
    @PostMapping(
            produces = {MediaType.APPLICATION_JSON_UTF8_VALUE, MediaType.APPLICATION_XML_VALUE},
            consumes = {MediaType.APPLICATION_JSON_UTF8_VALUE, MediaType.APPLICATION_XML_VALUE}
    )

    public ResponseEntity createEstablecimiento(@RequestBody ModeloEstablecimiento establecimiento) {
        if (dbes.existsByIdEstablecimiento(establecimiento.getIdEstablecimiento())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        } else {
            dbes.save(establecimiento);
            URI location = ServletUriComponentsBuilder.fromCurrentContextPath().path("/establecimientos/{idEstablecimiento}").buildAndExpand(establecimiento.getIdEstablecimiento()).toUri();
            return ResponseEntity.created(location).body(establecimiento);
        }
    }

    @PreAuthorize("permitAll()")
    @GetMapping(
            path = "/{idAdministrador}/menus/{fechaSeleccionada}",
            produces = {MediaType.APPLICATION_JSON_UTF8_VALUE, MediaType.APPLICATION_XML_VALUE}
    )
    public ResponseEntity<Menu> getMenusEstablecimiento(@PathVariable("idAdministrador") String idAdministrador, @PathVariable("fechaSeleccionada") String fechaSeleccionada) {
        System.out.println(idAdministrador);
        System.out.println(fechaSeleccionada);
        return ResponseEntity.notFound().build();

    }




}
