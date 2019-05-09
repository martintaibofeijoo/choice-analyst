package usc.choiceanalyst.controller;

import org.springframework.beans.factory.annotation.Autowired;

import java.text.SimpleDateFormat;
import java.util.Collection;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import usc.choiceanalyst.model.ModeloUsuario;
import usc.choiceanalyst.repository.RepositorioEstablecimiento;
import usc.choiceanalyst.repository.RepositorioExperimento;
import usc.choiceanalyst.model.*;
import usc.choiceanalyst.repository.RepositorioUsuario;

import java.net.URI;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("experimentos")
public class ControladorExperimentos {

    private RepositorioExperimento dbex;
    private RepositorioEstablecimiento dbes;
    private RepositorioUsuario dbu;

    @Autowired
    public ControladorExperimentos(RepositorioExperimento dbex, RepositorioEstablecimiento dbes, RepositorioUsuario dbu) {
        this.dbex = dbex;
        this.dbes = dbes;
        this.dbu = dbu;
    }

    @PreAuthorize("hasRole('ADMINISTRADOR') and principal==#username")
    @GetMapping(
            path = "/{username}",
            produces = {MediaType.APPLICATION_JSON_UTF8_VALUE, MediaType.APPLICATION_XML_VALUE}
    )
    public ResponseEntity<Collection<ModeloExperimento>> getAllExperimentos(@PathVariable("username") String username) {
        ModeloExperimento experimento = new ModeloExperimento();
        experimento.setIdAdministrador(username);
        return ResponseEntity.ok(dbex.findByIdAdministrador(username));
    }

    @PreAuthorize("hasRole('ADMINISTRADOR')")
    @PostMapping(
            produces = {MediaType.APPLICATION_JSON_UTF8_VALUE, MediaType.APPLICATION_XML_VALUE},
            consumes = {MediaType.APPLICATION_JSON_UTF8_VALUE, MediaType.APPLICATION_XML_VALUE}
    )

    public ResponseEntity createExperimento(@RequestBody ModeloExperimento experimento) {
        if (experimento.getIdAdministrador().equals(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString())) {
            if (dbex.existsByIdExperimento(experimento.getIdExperimento())) {
                return ResponseEntity.status(HttpStatus.CONFLICT).build();
            } else {
                dbex.save(experimento);
                URI location = ServletUriComponentsBuilder.fromCurrentContextPath().path("/experimentos/{idExperimento}").buildAndExpand(experimento.getIdExperimento()).toUri();
                return ResponseEntity.created(location).body(experimento);
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PreAuthorize("hasRole('ADMINISTRADOR')")
    @DeleteMapping(path = "/{idExperimento}")
    public ResponseEntity deleteExperimento(@PathVariable("idExperimento") String idExperimento) {
        if (!dbex.existsByIdExperimento(idExperimento)) {
            return ResponseEntity.notFound().build();
        } else {
            ModeloExperimento experimento = dbex.findByIdExperimento(idExperimento).get();
            if (experimento.getIdAdministrador().equals(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString())) {
                dbex.deleteByIdExperimento(idExperimento);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
            return ResponseEntity.noContent().build();
        }
    }

    @PreAuthorize("hasRole('ADMINISTRADOR')")
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
            if (experimentoExistente.get().getIdAdministrador().equals(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString())) {
                if (!idExperimento.equals(experimento.getIdExperimento())) {
                    experimentoExistente.get().setIdExperimento(experimento.getIdExperimento());
                    dbex.deleteByIdExperimento(idExperimento);
                }
                experimentoExistente.get().setNombreExperimento(experimento.getNombreExperimento());
                experimentoExistente.get().setPreguntas(experimento.getPreguntas());
                experimentoExistente.get().setObjetivos(experimento.getObjetivos());

                dbex.save(experimentoExistente.get());
                return ResponseEntity.ok().body(experimentoExistente.get());
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        }
    }

    @PreAuthorize("hasRole('ADMINISTRADOR')")
    @GetMapping(
            path = "/verExperimento/{idExperimento}",
            produces = {MediaType.APPLICATION_JSON_UTF8_VALUE, MediaType.APPLICATION_XML_VALUE}
    )
    public ResponseEntity<ModeloExperimento> getExperimento(@PathVariable("idExperimento") String idExperimento) {
        if (dbex.existsByIdExperimento(idExperimento)) {
            ModeloExperimento experimento = dbex.findByIdExperimento(idExperimento).get();
            if (experimento.getIdAdministrador().equals(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString())) {
                return ResponseEntity.ok().body(experimento);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }









    @PreAuthorize("permitAll()")
    @GetMapping(
            path = "/realizarExperimento/{idEstablecimiento}",
            produces = {MediaType.APPLICATION_JSON_UTF8_VALUE, MediaType.APPLICATION_XML_VALUE}
    )
    public ResponseEntity<ModeloExperimento> getExperimentoEstablecimiento(@PathVariable("idEstablecimiento") String idEstablecimiento) {
        String pattern = "dd-MM-yyyy";
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
        String fechaActual = simpleDateFormat.format(new Date());

        if (dbes.existsByIdEstablecimiento(idEstablecimiento)) {
            Collection<ModeloExperimento> experimentos = dbex.findByIdsEstablecimientosContains(idEstablecimiento);
            for (int i = 0; i < experimentos.size(); i++) {
                if (((List<ModeloExperimento>) experimentos).get(i).getFechasExperimento().contains(fechaActual)) {
                    return ResponseEntity.ok().body(((List<ModeloExperimento>) experimentos).get(i));
                }
            }
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
