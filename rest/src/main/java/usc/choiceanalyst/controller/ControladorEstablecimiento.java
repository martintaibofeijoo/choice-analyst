package usc.choiceanalyst.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import usc.choiceanalyst.model.ModeloEstablecimiento;
import usc.choiceanalyst.model.auxiliar.Menu;
import usc.choiceanalyst.repository.RepositorioEstablecimiento;
import usc.choiceanalyst.repository.RepositorioUsuario;

import java.net.URI;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("establecimientos")
public class ControladorEstablecimiento {

    private RepositorioEstablecimiento dbes;
    private RepositorioUsuario dbu;


    @Autowired
    public ControladorEstablecimiento(RepositorioEstablecimiento dbes, RepositorioUsuario dbu) {
        this.dbes = dbes;
        this.dbu = dbu;
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
    public ResponseEntity<Collection<ModeloEstablecimiento>> getAllEstablecimientos(@RequestParam(value = "idAdministrador", defaultValue = "") String idAdministrador) {
        ModeloEstablecimiento establecimiento = new ModeloEstablecimiento();
        if (!idAdministrador.isEmpty()) {
            establecimiento.setIdAdministrador(idAdministrador);
        }
        return ResponseEntity.ok(dbes.findAll(Example.of(establecimiento)));
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
            List<Menu> menus = new ArrayList<Menu>();
            establecimiento.setMenus(menus);
            dbes.save(establecimiento);
            URI location = ServletUriComponentsBuilder.fromCurrentContextPath().path("/establecimientos/{idEstablecimiento}").buildAndExpand(establecimiento.getIdEstablecimiento()).toUri();
            return ResponseEntity.created(location).body(establecimiento);
        }
    }

    @PreAuthorize("permitAll()")
    @GetMapping(
            path = "/{idEstablecimiento}/menus",
            produces = {MediaType.APPLICATION_JSON_UTF8_VALUE, MediaType.APPLICATION_XML_VALUE}
    )
    public ResponseEntity<Collection<Menu>> getMenusEstablecimiento(@PathVariable("idEstablecimiento") String idEstablecimiento,  @RequestParam(value = "fechaSeleccionada", defaultValue = "") String fechaSeleccionada) {
        ModeloEstablecimiento establecimiento = dbes.findByIdEstablecimiento(idEstablecimiento).get();

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
    }

    @PreAuthorize("permitAll()")
    @PutMapping(
            path = "/{idEstablecimiento}",
            produces = {MediaType.APPLICATION_JSON_UTF8_VALUE, MediaType.APPLICATION_XML_VALUE},
            consumes = {MediaType.APPLICATION_JSON_UTF8_VALUE, MediaType.APPLICATION_XML_VALUE}
    )

    public ResponseEntity modifyEstablecimiento(@RequestBody ModeloEstablecimiento establecimiento, @PathVariable("idEstablecimiento") String idEstablecimiento) {
        if (!dbes.existsByIdEstablecimiento(idEstablecimiento) && !dbu.existsByUsername(establecimiento.getIdAdministrador())) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } else {
            Optional<ModeloEstablecimiento> establecimientoExistente = dbes.findByIdEstablecimiento(idEstablecimiento);
            establecimientoExistente.get().setIdEstablecimiento(establecimiento.getIdEstablecimiento());
            establecimientoExistente.get().setIdAdministrador(establecimiento.getIdAdministrador());
            establecimientoExistente.get().setLocalizacionEstablecimiento(establecimiento.getLocalizacionEstablecimiento());
            establecimientoExistente.get().setNombreEstablecimiento(establecimiento.getNombreEstablecimiento());
            establecimientoExistente.get().setTipoEstablecimiento(establecimiento.getTipoEstablecimiento());

            dbes.save(establecimientoExistente.get());
            return ResponseEntity.ok().body(establecimientoExistente.get());
        }
    }

    @PreAuthorize("permitAll()")
    @PostMapping(
            path = "/{idEstablecimiento}/menus",
            produces = {MediaType.APPLICATION_JSON_UTF8_VALUE, MediaType.APPLICATION_XML_VALUE}
    )
    public ResponseEntity<ModeloEstablecimiento> createMenu(@PathVariable("idEstablecimiento") String idEstablecimiento, @RequestBody Menu menu) {
        if (dbes.existsByIdEstablecimiento(idEstablecimiento)) {
            Optional<ModeloEstablecimiento> establecimiento = dbes.findByIdEstablecimiento(idEstablecimiento);
            for (int i = 0; i < establecimiento.get().getMenus().size(); i++) {
                if (establecimiento.get().getMenus().get(i).getIdMenu().equals(menu.getIdMenu())) {
                    return ResponseEntity.status(HttpStatus.CONFLICT).build();
                }
            }
            establecimiento.get().getMenus().add(menu);
            dbes.save(establecimiento.get());
            return ResponseEntity.ok().body(dbes.findByIdEstablecimiento(idEstablecimiento).get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PreAuthorize("permitAll()")
    @DeleteMapping(
            path = "/{idEstablecimiento}/menus/{idMenu}",
            produces = {MediaType.APPLICATION_JSON_UTF8_VALUE, MediaType.APPLICATION_XML_VALUE}
    )
    public ResponseEntity deleteMenu(@PathVariable("idEstablecimiento") String idEstablecimiento, @PathVariable("idMenu") String idMenu) {
        if (dbes.existsByIdEstablecimiento(idEstablecimiento)) {
            Optional<ModeloEstablecimiento> establecimiento = dbes.findByIdEstablecimiento(idEstablecimiento);
            for (int i = 0; i < establecimiento.get().getMenus().size(); i++) {
                if (establecimiento.get().getMenus().get(i).getIdMenu().equals(idMenu)) {
                    establecimiento.get().getMenus().remove(i);
                }
            }
            dbes.save(establecimiento.get());
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
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
    @GetMapping(
            path = "/{idEstablecimiento}/menus/{idMenu}",
            produces = {MediaType.APPLICATION_JSON_UTF8_VALUE, MediaType.APPLICATION_XML_VALUE}
    )
    public ResponseEntity<Menu> getMenuEstablecimiento(@PathVariable("idEstablecimiento") String idEstablecimiento, @PathVariable("idMenu") String idMenu) {
        if (dbes.existsByIdEstablecimiento(idEstablecimiento)) {
            ModeloEstablecimiento establecimiento=dbes.findByIdEstablecimiento(idEstablecimiento).get();
            for (int i = 0; i < establecimiento.getMenus().size(); i++) {
                if (establecimiento.getMenus().get(i).getIdMenu().equals(idMenu)) {
                    return ResponseEntity.ok().body(establecimiento.getMenus().get(i));
                }
            }
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
