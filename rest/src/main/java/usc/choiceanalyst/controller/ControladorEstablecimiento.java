package usc.choiceanalyst.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import usc.choiceanalyst.model.ModeloEstablecimiento;
import usc.choiceanalyst.model.ModeloExperimento;
import usc.choiceanalyst.model.auxiliar.Menu;
import usc.choiceanalyst.repository.RepositorioEstablecimiento;
import usc.choiceanalyst.repository.RepositorioExperiencia;
import usc.choiceanalyst.repository.RepositorioExperimento;
import usc.choiceanalyst.repository.RepositorioUsuario;

import java.net.URI;
import java.util.*;

@RestController
@RequestMapping("establecimientos")
public class ControladorEstablecimiento {

    private RepositorioUsuario dbUsuario;
    private RepositorioEstablecimiento dbEstablecimiento;
    private RepositorioExperimento dbExperimento;
    private RepositorioExperiencia dbExperiencia;


    @Autowired
    public ControladorEstablecimiento(RepositorioUsuario dbUsuario, RepositorioEstablecimiento dbEstablecimiento, RepositorioExperimento dbExperimento, RepositorioExperiencia dbExperiencia) {
        this.dbUsuario = dbUsuario;
        this.dbEstablecimiento = dbEstablecimiento;
        this.dbExperimento = dbExperimento;
        this.dbExperiencia = dbExperiencia;
    }

    @PreAuthorize("hasRole('ADMINISTRADOR')")
    @GetMapping(
            path = "/{idEstablecimiento}",
            produces = {MediaType.APPLICATION_JSON_UTF8_VALUE, MediaType.APPLICATION_XML_VALUE}
    )
    public ResponseEntity<ModeloEstablecimiento> getEstablecimiento(@PathVariable("idEstablecimiento") String idEstablecimiento) {
        if (dbEstablecimiento.existsByIdEstablecimiento(idEstablecimiento)) {
            ModeloEstablecimiento establecimiento = dbEstablecimiento.findByIdEstablecimiento(idEstablecimiento).get();
            if (establecimiento.getIdAdministrador().equals(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString())) {
                if (establecimiento.getIdAdministrador().equals(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString())) {
                    return ResponseEntity.ok().body(establecimiento);
                } else {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
                }
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PreAuthorize("hasRole('CLIENTE')")
    @GetMapping(
            produces = {MediaType.APPLICATION_JSON_UTF8_VALUE, MediaType.APPLICATION_XML_VALUE}
    )
    public ResponseEntity<Collection<ModeloEstablecimiento>> getAllEstablecimientos(@RequestParam(value = "nombreEstablecimiento", defaultValue = "") String nombreEstablecimiento,
                                                                                    @RequestParam(value = "idAdministrador", defaultValue = "") String idAdministrador) {
        ModeloEstablecimiento establecimiento = new ModeloEstablecimiento();
        if (!idAdministrador.isEmpty()) {
            establecimiento.setIdAdministrador(idAdministrador);
        }
        if (!nombreEstablecimiento.isEmpty()) {
            establecimiento.setNombreEstablecimiento(nombreEstablecimiento);
        }

        return ResponseEntity.ok(dbEstablecimiento.findAll(Example.of(establecimiento, ExampleMatcher.matching().withIgnoreCase()), Sort.by(Sort.Order.asc("idEstablecimiento"))));
    }


    @PreAuthorize("hasRole('ADMINISTRADOR')")
    @PostMapping(
            produces = {MediaType.APPLICATION_JSON_UTF8_VALUE, MediaType.APPLICATION_XML_VALUE},
            consumes = {MediaType.APPLICATION_JSON_UTF8_VALUE, MediaType.APPLICATION_XML_VALUE}
    )

    public ResponseEntity createEstablecimiento(@RequestBody ModeloEstablecimiento establecimiento) {
        if (establecimiento.getIdAdministrador().equals(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString())) {
            if (dbEstablecimiento.existsByIdEstablecimiento(establecimiento.getIdEstablecimiento())) {
                return ResponseEntity.status(HttpStatus.CONFLICT).build();
            } else {
                List<Menu> menus = new ArrayList<Menu>();
                establecimiento.setMenus(menus);
                dbEstablecimiento.save(establecimiento);
                URI location = ServletUriComponentsBuilder.fromCurrentContextPath().path("/establecimientos/{idEstablecimiento}").buildAndExpand(establecimiento.getIdEstablecimiento()).toUri();
                return ResponseEntity.created(location).body(establecimiento);
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PreAuthorize("hasRole('ADMINISTRADOR')")
    @GetMapping(
            path = "/{idEstablecimiento}/menus",
            produces = {MediaType.APPLICATION_JSON_UTF8_VALUE, MediaType.APPLICATION_XML_VALUE}
    )
    public ResponseEntity<Collection<Menu>> getMenusEstablecimiento(@PathVariable("idEstablecimiento") String idEstablecimiento, @RequestParam(value = "fechaSeleccionada", defaultValue = "") String fechaSeleccionada) {
        ModeloEstablecimiento establecimiento = dbEstablecimiento.findByIdEstablecimiento(idEstablecimiento).get();
        if (establecimiento.getIdAdministrador().equals(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString())) {
            if (establecimiento != null) {
                Collection<Menu> menus = new ArrayList<Menu>();
                for (int i = 0; i < establecimiento.getMenus().size(); i++) {
                    if (establecimiento.getMenus().get(i).getFechasMenu().contains(fechaSeleccionada)) {
                        ((ArrayList<Menu>) menus).add(establecimiento.getMenus().get(i));
                    }
                }
                return ResponseEntity.ok().body(menus);
            } else {
                return ResponseEntity.notFound().build();
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }


    @PreAuthorize("hasRole('ADMINISTRADOR')")
    @PostMapping(
            path = "/{idEstablecimiento}/menus",
            produces = {MediaType.APPLICATION_JSON_UTF8_VALUE, MediaType.APPLICATION_XML_VALUE}
    )
    public ResponseEntity<ModeloEstablecimiento> createMenu(@PathVariable("idEstablecimiento") String idEstablecimiento, @RequestBody Menu menu) {
        if (dbEstablecimiento.existsByIdEstablecimiento(idEstablecimiento)) {
            Optional<ModeloEstablecimiento> establecimiento = dbEstablecimiento.findByIdEstablecimiento(idEstablecimiento);
            if (establecimiento.get().getIdAdministrador().equals(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString())) {
                for (int i = 0; i < establecimiento.get().getMenus().size(); i++) {
                    if (establecimiento.get().getMenus().get(i).getIdMenu().equals(menu.getIdMenu())) {
                        return ResponseEntity.status(HttpStatus.CONFLICT).build();
                    }
                }
                establecimiento.get().getMenus().add(menu);
                dbEstablecimiento.save(establecimiento.get());
                return ResponseEntity.ok().body(dbEstablecimiento.findByIdEstablecimiento(idEstablecimiento).get());
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PreAuthorize("hasRole('ADMINISTRADOR')")
    @DeleteMapping(
            path = "/{idEstablecimiento}/menus/{idMenu}",
            produces = {MediaType.APPLICATION_JSON_UTF8_VALUE, MediaType.APPLICATION_XML_VALUE}
    )
    public ResponseEntity deleteMenu(@PathVariable("idEstablecimiento") String idEstablecimiento, @PathVariable("idMenu") String idMenu) {
        if (!dbExperiencia.existsByIdEstablecimiento(idEstablecimiento)) {
            if (dbEstablecimiento.existsByIdEstablecimiento(idEstablecimiento)) {
                Optional<ModeloEstablecimiento> establecimiento = dbEstablecimiento.findByIdEstablecimiento(idEstablecimiento);
                if (establecimiento.get().getIdAdministrador().equals(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString())) {
                    for (int i = 0; i < establecimiento.get().getMenus().size(); i++) {
                        if (establecimiento.get().getMenus().get(i).getIdMenu().equals(idMenu)) {
                            establecimiento.get().getMenus().remove(i);
                        }
                    }
                    dbEstablecimiento.save(establecimiento.get());
                    return ResponseEntity.noContent().build();
                } else {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
                }
            } else {
                return ResponseEntity.notFound().build();
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }


    @PreAuthorize("hasRole('ADMINISTRADOR')")
    @DeleteMapping(path = "/{idEstablecimiento}")
    public ResponseEntity deleteEstablecimiento(@PathVariable("idEstablecimiento") String idEstablecimiento) {
        if (!dbExperiencia.existsByIdEstablecimiento(idEstablecimiento)) {
            if (!dbEstablecimiento.existsByIdEstablecimiento(idEstablecimiento)) {
                return ResponseEntity.notFound().build();
            } else {
                ModeloEstablecimiento establecimiento = dbEstablecimiento.findByIdEstablecimiento(idEstablecimiento).get();
                if (establecimiento.getIdAdministrador().equals(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString())) {
                    dbEstablecimiento.deleteByIdEstablecimiento(idEstablecimiento);
                    return ResponseEntity.noContent().build();
                } else {
                    return ResponseEntity.notFound().build();
                }
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PreAuthorize("hasRole('ADMINISTRADOR')")
    @GetMapping(
            path = "/{idEstablecimiento}/menus/{idMenu}",
            produces = {MediaType.APPLICATION_JSON_UTF8_VALUE, MediaType.APPLICATION_XML_VALUE}
    )
    public ResponseEntity<Menu> getMenuEstablecimiento(@PathVariable("idEstablecimiento") String idEstablecimiento, @PathVariable("idMenu") String idMenu) {
        if (dbEstablecimiento.existsByIdEstablecimiento(idEstablecimiento)) {
            ModeloEstablecimiento establecimiento = dbEstablecimiento.findByIdEstablecimiento(idEstablecimiento).get();
            if (establecimiento.getIdAdministrador().equals(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString())) {
                for (int i = 0; i < establecimiento.getMenus().size(); i++) {
                    if (establecimiento.getMenus().get(i).getIdMenu().equals(idMenu)) {
                        return ResponseEntity.ok().body(establecimiento.getMenus().get(i));
                    }
                }
                return ResponseEntity.notFound().build();
            } else {
                return ResponseEntity.notFound().build();
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PreAuthorize("hasRole('ADMINISTRADOR')")
    @PutMapping(
            path = "/{idEstablecimiento}/menus/{idMenu}",
            produces = {MediaType.APPLICATION_JSON_UTF8_VALUE, MediaType.APPLICATION_XML_VALUE},
            consumes = {MediaType.APPLICATION_JSON_UTF8_VALUE, MediaType.APPLICATION_XML_VALUE}
    )

    public ResponseEntity modifyMenu(@RequestBody Menu menu, @PathVariable("idEstablecimiento") String idEstablecimiento, @PathVariable("idMenu") String idMenu) {
        if (!dbExperiencia.existsByIdEstablecimiento(idEstablecimiento)) {

            if (!dbEstablecimiento.existsByIdEstablecimiento(idEstablecimiento)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            } else {
                ModeloEstablecimiento establecimiento = dbEstablecimiento.findByIdEstablecimiento(idEstablecimiento).get();
                if (establecimiento.getIdAdministrador().equals(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString())) {
                    if (!idMenu.equals(menu.getIdMenu())) {
                        for (int i = 0; i < establecimiento.getMenus().size(); i++) {
                            if (establecimiento.getMenus().get(i).getIdMenu().equals(menu.getIdMenu())) {
                                return ResponseEntity.status(HttpStatus.CONFLICT).build();
                            }
                        }
                    }
                    for (int i = 0; i < establecimiento.getMenus().size(); i++) {
                        if (establecimiento.getMenus().get(i).getIdMenu().equals(idMenu)) {
                            establecimiento.getMenus().set(i, menu);
                        }
                    }
                } else {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
                }
                dbEstablecimiento.save(establecimiento);
                return ResponseEntity.ok().body(menu);
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PreAuthorize("hasRole('ADMINISTRADOR')")
    @PutMapping(
            path = "/{idEstablecimiento}",
            produces = {MediaType.APPLICATION_JSON_UTF8_VALUE, MediaType.APPLICATION_XML_VALUE},
            consumes = {MediaType.APPLICATION_JSON_UTF8_VALUE, MediaType.APPLICATION_XML_VALUE}
    )

    public ResponseEntity modifyEstablecimiento(@RequestBody ModeloEstablecimiento establecimiento, @PathVariable("idEstablecimiento") String idEstablecimiento) {
        if (!dbExperiencia.existsByIdEstablecimiento(idEstablecimiento)) {
            ModeloEstablecimiento establecimientoExistente;
            if (!dbEstablecimiento.existsByIdEstablecimiento(idEstablecimiento)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            } else {
                establecimientoExistente = dbEstablecimiento.findByIdEstablecimiento(idEstablecimiento).get();
                if (establecimientoExistente.getIdAdministrador().equals(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString())) {
                    if (!idEstablecimiento.equals(establecimiento.getIdEstablecimiento())) {
                        if (dbEstablecimiento.existsByIdEstablecimiento(establecimiento.getIdEstablecimiento())) {
                            return ResponseEntity.status(HttpStatus.CONFLICT).build();
                        } else {
                            establecimientoExistente.setIdEstablecimiento(establecimiento.getIdEstablecimiento());
                            List<ModeloExperimento> experimentos = dbExperimento.findByIdAdministradorAndIdsEstablecimientosContains(establecimientoExistente.getIdAdministrador(), idEstablecimiento);
                            for (int i = 0; i < experimentos.size(); i++) {
                                for (int j = 0; j < experimentos.get(i).getIdsEstablecimientos().size(); j++) {
                                    if (experimentos.get(i).getIdsEstablecimientos().get(j).equals(idEstablecimiento)) {
                                        experimentos.get(i).getIdsEstablecimientos().set(j, establecimiento.getIdEstablecimiento());
                                        dbExperimento.save(experimentos.get(i));
                                    }
                                }
                            }
                            dbEstablecimiento.deleteByIdEstablecimiento(idEstablecimiento);
                        }
                    }
                    establecimientoExistente.setLocalizacionEstablecimiento(establecimiento.getLocalizacionEstablecimiento());
                    establecimientoExistente.setNombreEstablecimiento(establecimiento.getNombreEstablecimiento());
                    establecimientoExistente.setTipoEstablecimiento(establecimiento.getTipoEstablecimiento());
                    dbEstablecimiento.save(establecimientoExistente);

                    return ResponseEntity.ok().body(establecimientoExistente);
                } else {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
                }
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

}
