package usc.choiceanalyst.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;

import java.util.Collection;
import java.util.stream.Collectors;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import usc.choiceanalyst.model.ModeloEstablecimiento;
import usc.choiceanalyst.model.ModeloUsuario;
import usc.choiceanalyst.repository.RepositorioEstablecimiento;
import usc.choiceanalyst.repository.RepositorioExperimento;
import usc.choiceanalyst.model.*;
import java.net.URI;
import java.text.Normalizer;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Optional;

@RestController
@RequestMapping("experimentos")
public class ControladorExperimentos {

    private RepositorioExperimento dbex;
    private RepositorioEstablecimiento dbes;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public ControladorExperimentos(RepositorioExperimento dbex, RepositorioEstablecimiento dbes, PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
        this.dbex= dbex;
        this.dbes = dbes;

    }

    @PreAuthorize("principal == #username || hasRole('ADMINISTRADOR')")
    @GetMapping(
            path = "/{username}",
            produces = {MediaType.APPLICATION_JSON_UTF8_VALUE, MediaType.APPLICATION_XML_VALUE}
    )
    public ResponseEntity<Collection<ModeloExperimento>> getAllExperimentos(@PathVariable("username") String username) {
        ModeloExperimento experimento = new ModeloExperimento();
        experimento.setIdAdministrador(username);
        return ResponseEntity.ok(dbex.findAll(Example.of(experimento)));
    }

    @PreAuthorize("permitAll()")
    @PostMapping(
            produces = {MediaType.APPLICATION_JSON_UTF8_VALUE, MediaType.APPLICATION_XML_VALUE},
            consumes = {MediaType.APPLICATION_JSON_UTF8_VALUE, MediaType.APPLICATION_XML_VALUE}
    )

    public ResponseEntity createExperimento(@RequestBody ModeloExperimento experimento) {
        System.out.println("hola");
        if (dbex.existsByIdExperimento(experimento.getIdExperimento())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        } else {



            URI location = ServletUriComponentsBuilder.fromCurrentContextPath().path("/experimentos/{idExperimento}").buildAndExpand(experimento.getIdExperimento()).toUri();
            return ResponseEntity.created(location).body(experimento);
        }
    }


}
