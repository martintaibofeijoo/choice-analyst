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
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import usc.choiceanalyst.model.ModeloExperiencia;
import usc.choiceanalyst.model.ModeloUsuario;
import usc.choiceanalyst.repository.RepositorioEstablecimiento;
import usc.choiceanalyst.repository.RepositorioExperiencia;
import usc.choiceanalyst.repository.RepositorioUsuario;

import java.net.URI;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Optional;


@RestController
@RequestMapping("experiencias")
public class ControladorExperiencias {

    private RepositorioExperiencia dbex;


    @Autowired
    public ControladorExperiencias(RepositorioExperiencia dbex) {
        this.dbex = dbex;
    }


    //hasRole('CLIENTE')
    @PreAuthorize("permitAll()")
    @PostMapping(
            produces = {MediaType.APPLICATION_JSON_UTF8_VALUE, MediaType.APPLICATION_XML_VALUE},
            consumes = {MediaType.APPLICATION_JSON_UTF8_VALUE, MediaType.APPLICATION_XML_VALUE}
    )

    public ResponseEntity createExperiencia(@RequestBody ModeloExperiencia experiencia) {
        dbex.save(experiencia);
        return ResponseEntity.ok().body(experiencia);
    }

}
