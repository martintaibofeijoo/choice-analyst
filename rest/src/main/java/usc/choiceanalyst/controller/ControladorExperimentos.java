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
import usc.choiceanalyst.repository.RepositorioUsuario;

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
    private RepositorioUsuario dbu;

    @Autowired
    public ControladorExperimentos(RepositorioExperimento dbex, RepositorioEstablecimiento dbes, RepositorioUsuario dbu) {
        this.dbex= dbex;
        this.dbes = dbes;
        this.dbu=dbu;
    }

    @PreAuthorize("permitAll()")
    @GetMapping(
            path = "/{username}",
            produces = {MediaType.APPLICATION_JSON_UTF8_VALUE, MediaType.APPLICATION_XML_VALUE}
    )
    public ResponseEntity<Collection<ModeloExperimento>> getAllExperimentos(@PathVariable("username") String username) {
        ModeloExperimento experimento = new ModeloExperimento();
        experimento.setIdAdministrador(username);
        return ResponseEntity.ok(dbex.findByIdAdministrador(username));
    }

    @PreAuthorize("permitAll()")
    @PostMapping(
            produces = {MediaType.APPLICATION_JSON_UTF8_VALUE, MediaType.APPLICATION_XML_VALUE},
            consumes = {MediaType.APPLICATION_JSON_UTF8_VALUE, MediaType.APPLICATION_XML_VALUE}
    )

    public ResponseEntity createExperimento(@RequestBody ModeloExperimento experimento) {
        if (dbex.existsByIdExperimento(experimento.getIdExperimento())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        } else {
            Optional<ModeloUsuario> usuario = dbu.findByUsername(experimento.getIdAdministrador());
            experimento.setIdEstablecimiento(usuario.get().getIdEstablecimiento());
            dbex.save(experimento);
            URI location = ServletUriComponentsBuilder.fromCurrentContextPath().path("/experimentos/{idExperimento}").buildAndExpand(experimento.getIdExperimento()).toUri();
            return ResponseEntity.created(location).body(experimento);
        }
    }

    @PreAuthorize("permitAll()")
    @DeleteMapping(path = "/{idExperimento}")
    public ResponseEntity deleteExperimento(@PathVariable("idExperimento") String idExperimento) {
        if (!dbex.existsByIdExperimento(idExperimento)) {
            return ResponseEntity.notFound().build();
        } else {
            dbex.deleteByIdExperimento(idExperimento);
            return ResponseEntity.noContent().build();
        }
    }

    @PreAuthorize("permitAll()")
    @PutMapping(
            path = "/{idExperimento}",
            produces = {MediaType.APPLICATION_JSON_UTF8_VALUE, MediaType.APPLICATION_XML_VALUE},
            consumes = {MediaType.APPLICATION_JSON_UTF8_VALUE, MediaType.APPLICATION_XML_VALUE}
    )

    public ResponseEntity modifyExperimento(@RequestBody ModeloExperimento experimento, @PathVariable("idExperimento") String idExperimento) {
        if (!dbex.existsByIdExperimento(idExperimento)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } else {
            Optional<ModeloExperimento> experimentoExistente = dbex.findByIdExperimento(idExperimento);
            if(!idExperimento.equals(experimento.getIdExperimento())){
                experimentoExistente.get().setIdExperimento(experimento.getIdExperimento());
                dbex.deleteByIdExperimento(idExperimento);
            }
            experimentoExistente.get().setNombreExperimento(experimento.getNombreExperimento());
            experimentoExistente.get().setPreguntas(experimento.getPreguntas());
            experimentoExistente.get().setObjetivos(experimento.getObjetivos());

            dbex.save(experimentoExistente.get());
            return ResponseEntity.ok().body(experimentoExistente.get());
        }
    }

    @PreAuthorize("permitAll()")
    @GetMapping(
            path = "/verExperimento/{idExperimento}",
            produces = {MediaType.APPLICATION_JSON_UTF8_VALUE, MediaType.APPLICATION_XML_VALUE}
    )
    public ResponseEntity<ModeloExperimento> getExperimento(@PathVariable("idExperimento") String idExperimento) {
        if (dbex.existsByIdExperimento(idExperimento)) {
            return ResponseEntity.ok().body(dbex.findByIdExperimento(idExperimento).get());

        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
