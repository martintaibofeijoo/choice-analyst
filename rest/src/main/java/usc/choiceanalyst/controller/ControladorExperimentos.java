package usc.choiceanalyst.controller;

import org.springframework.beans.factory.annotation.Autowired;

import java.text.SimpleDateFormat;
import java.util.*;

import org.springframework.data.domain.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import usc.choiceanalyst.repository.RepositorioEstablecimiento;
import usc.choiceanalyst.repository.RepositorioExperiencia;
import usc.choiceanalyst.repository.RepositorioExperimento;
import usc.choiceanalyst.model.*;
import usc.choiceanalyst.repository.RepositorioUsuario;

import java.net.URI;

@RestController
@RequestMapping("experimentos")
public class ControladorExperimentos {

    private RepositorioExperimento dbExperimento;
    private RepositorioEstablecimiento dbEstablecimiento;
    private RepositorioUsuario dbUsuario;
    private RepositorioExperiencia dbExperiencia;


    @Autowired
    public ControladorExperimentos(RepositorioExperimento dbExperimento, RepositorioEstablecimiento dbEstablecimiento, RepositorioUsuario dbUsuario, RepositorioExperiencia dbExperiencia) {
        this.dbExperimento = dbExperimento;
        this.dbEstablecimiento = dbEstablecimiento;
        this.dbUsuario = dbUsuario;
        this.dbExperiencia = dbExperiencia;
    }

    @PreAuthorize("hasRole('ADMINISTRADOR')")
    @GetMapping(
            produces = {MediaType.APPLICATION_JSON_UTF8_VALUE, MediaType.APPLICATION_XML_VALUE}
    )
    public ResponseEntity<Collection<ModeloExperimento>> getAllExperimentos(@RequestParam(value = "idAdministrador", defaultValue = "") String idAdministrador, @RequestParam(value = "nombreExperimento", defaultValue = "") String nombreExperimento) {
        if (idAdministrador.equals(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString())) {
            ModeloExperimento experimento = new ModeloExperimento();
            experimento.setIdAdministrador(idAdministrador);
            experimento.setNombreExperimento(nombreExperimento);

            return ResponseEntity.ok(dbExperimento.findAll(Example.of(experimento, ExampleMatcher.matching().withIgnoreCase()), Sort.by(Sort.Order.asc("idExperimento"))));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PreAuthorize("hasRole('ADMINISTRADOR')")
    @PostMapping(
            produces = {MediaType.APPLICATION_JSON_UTF8_VALUE, MediaType.APPLICATION_XML_VALUE},
            consumes = {MediaType.APPLICATION_JSON_UTF8_VALUE, MediaType.APPLICATION_XML_VALUE}
    )

    public ResponseEntity createExperimento(@RequestBody ModeloExperimento experimento) {
        if (experimento.getIdAdministrador().equals(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString())) {
            if (dbExperimento.existsByIdExperimento(experimento.getIdExperimento())) {
                return ResponseEntity.status(HttpStatus.CONFLICT).build();
            } else {
                String pattern = "dd-MM-yyyy";
                SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
                String fechaActual = simpleDateFormat.format(new Date());
                experimento.setFechaCreacion(fechaActual);
                dbExperimento.save(experimento);
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
        if (!dbExperiencia.existsByIdExperimento(idExperimento)) {
            if (!dbExperimento.existsByIdExperimento(idExperimento)) {
                return ResponseEntity.notFound().build();
            } else {
                ModeloExperimento experimento = dbExperimento.findByIdExperimento(idExperimento).get();
                if (experimento.getIdAdministrador().equals(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString())) {
                    dbExperimento.deleteByIdExperimento(idExperimento);
                } else {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
                }
                return ResponseEntity.noContent().build();
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PreAuthorize("hasRole('ADMINISTRADOR')")
    @PutMapping(
            path = "/{idExperimento}",
            produces = {MediaType.APPLICATION_JSON_UTF8_VALUE, MediaType.APPLICATION_XML_VALUE},
            consumes = {MediaType.APPLICATION_JSON_UTF8_VALUE, MediaType.APPLICATION_XML_VALUE}
    )

    public ResponseEntity modifyExperimento(@RequestBody ModeloExperimento experimento, @PathVariable("idExperimento") String idExperimento) {
        if (!dbExperiencia.existsByIdExperimento(idExperimento)) {
            ModeloExperimento experimentoExistente;
            if (!dbExperimento.existsByIdExperimento(idExperimento)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            } else {
                experimentoExistente = dbExperimento.findByIdExperimento(idExperimento).get();
                if (experimentoExistente.getIdAdministrador().equals(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString())) {
                    if (!idExperimento.equals(experimento.getIdExperimento())) {
                        if (dbExperimento.existsByIdExperimento(experimento.getIdExperimento())) {
                            return ResponseEntity.status(HttpStatus.CONFLICT).build();
                        } else {
                            experimentoExistente.setIdExperimento(experimento.getIdExperimento());
                            dbExperimento.deleteByIdExperimento(idExperimento);
                        }
                    }
                    experimentoExistente.setNombreExperimento(experimento.getNombreExperimento());
                    experimentoExistente.setPreguntas(experimento.getPreguntas());
                    experimentoExistente.setObjetivos(experimento.getObjetivos());
                    experimentoExistente.setFechasExperimento(experimento.getFechasExperimento());
                    experimentoExistente.setIdsEstablecimientos(experimento.getIdsEstablecimientos());
                    dbExperimento.save(experimentoExistente);
                    return ResponseEntity.ok().body(experimentoExistente);
                } else {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
                }
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PreAuthorize("hasRole('ADMINISTRADOR')")
    @GetMapping(
            path = "/verExperimento/{idExperimento}",
            produces = {MediaType.APPLICATION_JSON_UTF8_VALUE, MediaType.APPLICATION_XML_VALUE}
    )
    public ResponseEntity<ModeloExperimento> getExperimento(@PathVariable("idExperimento") String idExperimento) {
        if (dbExperimento.existsByIdExperimento(idExperimento)) {
            ModeloExperimento experimento = dbExperimento.findByIdExperimento(idExperimento).get();
            if (experimento.getIdAdministrador().equals(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString())) {
                return ResponseEntity.ok().body(experimento);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    //Movil
    @PreAuthorize("hasRole('CLIENTE')")
    @GetMapping(
            path = "/obtenerExperimento/{idEstablecimiento}",
            produces = {MediaType.APPLICATION_JSON_UTF8_VALUE, MediaType.APPLICATION_XML_VALUE}
    )
    public ResponseEntity<ModeloExperimento> getExperimentoEstablecimiento
            (@PathVariable("idEstablecimiento") String idEstablecimiento) {
        String pattern = "dd-MM-yyyy";
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
        String fechaActual = simpleDateFormat.format(new Date());
        List<ModeloExperimento> listaPosiblesExperimentos= new ArrayList<>();

        if (dbEstablecimiento.existsByIdEstablecimiento(idEstablecimiento)) {
            Collection<ModeloExperimento> experimentos = dbExperimento.findByIdsEstablecimientosContains(idEstablecimiento);
            for (int i = 0; i < experimentos.size(); i++) {
                if (((List<ModeloExperimento>) experimentos).get(i).getFechasExperimento().contains(fechaActual)) {
                    listaPosiblesExperimentos.add(((List<ModeloExperimento>) experimentos).get(i));
                }
            }

            if(listaPosiblesExperimentos.size()!=0){
                Random r = new Random();
                int valorEntero = r.nextInt(listaPosiblesExperimentos.size());
                return ResponseEntity.ok().body(listaPosiblesExperimentos.get(valorEntero));
            }else{
                return ResponseEntity.notFound().build();
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
