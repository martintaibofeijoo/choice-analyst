package usc.choiceanalyst.controller;


import usc.choiceanalyst.model.ModeloEstablecimiento;
import usc.choiceanalyst.model.ModeloExperiencia;
import usc.choiceanalyst.model.ModeloExperimento;
import usc.choiceanalyst.model.ModeloUsuario;

import java.net.URI;
import java.text.SimpleDateFormat;
import java.util.*;

import usc.choiceanalyst.repository.RepositorioEstablecimiento;
import usc.choiceanalyst.repository.RepositorioExperiencia;
import usc.choiceanalyst.repository.RepositorioExperimento;
import usc.choiceanalyst.repository.RepositorioUsuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Example;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;


@RestController
@RequestMapping("usuarios")
public class ControladorUsuarios {

    private RepositorioUsuario dbUsuario;
    private RepositorioEstablecimiento dbEstablecimiento;
    private RepositorioExperimento dbExperimento;
    private RepositorioExperiencia dbExperiencia;
    private PasswordEncoder passwordEncoder;


    @Autowired
    public ControladorUsuarios(RepositorioUsuario dbUsuario, RepositorioEstablecimiento dbEstablecimiento, RepositorioExperimento dbExperimento, RepositorioExperiencia dbExperiencia, PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
        this.dbUsuario = dbUsuario;
        this.dbEstablecimiento = dbEstablecimiento;
        this.dbExperimento = dbExperimento;
        this.dbExperiencia = dbExperiencia;
    }

    @PreAuthorize("hasRole('CLIENTE') and principal==#username")
    @GetMapping(
            path = "/{username}",
            produces = {MediaType.APPLICATION_JSON_UTF8_VALUE, MediaType.APPLICATION_XML_VALUE}
    )
    public ResponseEntity<ModeloUsuario> getUser(@PathVariable("username") String username) {
        if (dbUsuario.existsByUsername(username)) {
            return ResponseEntity.ok().body(dbUsuario.findByUsername(username).get());

        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @PreAuthorize("permitAll()")
    @GetMapping(
            produces = {MediaType.APPLICATION_JSON_UTF8_VALUE, MediaType.APPLICATION_XML_VALUE}
    )
    public ResponseEntity<Page<ModeloUsuario>> getAllUsers(@RequestParam(value = "rol", defaultValue = "") String rol, @RequestParam(value = "page", defaultValue = "0") int page, @RequestParam(value = "size", defaultValue = "3") int size, @RequestParam(value = "sort", defaultValue = "username") String sort) {
        Sort criteria = Sort.by(sort.startsWith("-") ? Sort.Order.desc(sort.replaceFirst("-", "")) : Sort.Order.asc(sort));
        ModeloUsuario usuario = new ModeloUsuario();
        if (!rol.isEmpty()) {
            if (rol.equals("ROLE_ADMINISTRADOR")) {
                usuario.setRol(rol);
            }
        }
        return ResponseEntity.ok(dbUsuario.findAll(Example.of(usuario), PageRequest.of(page, size, criteria)));
    }


    @PreAuthorize("hasRole('CLIENTE') and principal==#username")
    @DeleteMapping(path = "/{username}")
    public ResponseEntity deleteUser(@PathVariable("username") String username) {
        if (!dbUsuario.existsByUsername(username)) {
            return ResponseEntity.notFound().build();
        } else {
            dbUsuario.deleteByUsername(username);
            return ResponseEntity.noContent().build();
        }
    }

    @PreAuthorize("permitAll()")
    @PostMapping(
            path = "/administradores",
            produces = {MediaType.APPLICATION_JSON_UTF8_VALUE, MediaType.APPLICATION_XML_VALUE},
            consumes = {MediaType.APPLICATION_JSON_UTF8_VALUE, MediaType.APPLICATION_XML_VALUE}
    )

    public ResponseEntity createAdministrador(@RequestBody ModeloUsuario usuario) {
        if (dbUsuario.existsByUsername(usuario.getUsername())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        } else {
            String pattern = "dd-MM-yyyy";
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
            usuario.setFechaRegistro(simpleDateFormat.format(new Date()));
            usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
            usuario.setRol("ADMINISTRADOR");
            dbUsuario.save(usuario);
            URI location = ServletUriComponentsBuilder.fromCurrentContextPath().path("/usuarios/{username}").buildAndExpand(usuario.getUsername()).toUri();
            return ResponseEntity.created(location).body(usuario.setPassword("*********"));
        }
    }


    //Servicio Movil
    @PreAuthorize("permitAll()")
    @PostMapping(
            path = "/clientes",
            produces = {MediaType.APPLICATION_JSON_UTF8_VALUE, MediaType.APPLICATION_XML_VALUE},
            consumes = {MediaType.APPLICATION_JSON_UTF8_VALUE, MediaType.APPLICATION_XML_VALUE}
    )

    public ResponseEntity createCliente(@RequestBody ModeloUsuario usuario) {
        if (dbUsuario.existsByUsername(usuario.getUsername())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        } else {
            String pattern = "dd-MM-yyyy";
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
            usuario.setFechaRegistro(simpleDateFormat.format(new Date()));
            usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
            usuario.setRol("CLIENTE");
            dbUsuario.save(usuario);
            URI location = ServletUriComponentsBuilder.fromCurrentContextPath().path("/usuarios/clientes/{username}").buildAndExpand(usuario.getUsername()).toUri();
            return ResponseEntity.created(location).body(usuario.setPassword("*********"));
        }
    }


    @PreAuthorize("hasRole('ADMINISTRADOR') and principal==#username")
    @PutMapping(
            path = "/administradores/{username}",
            produces = {MediaType.APPLICATION_JSON_UTF8_VALUE, MediaType.APPLICATION_XML_VALUE},
            consumes = {MediaType.APPLICATION_JSON_UTF8_VALUE, MediaType.APPLICATION_XML_VALUE}
    )

    public ResponseEntity modifyAdministrador(@RequestBody ModeloUsuario usuario, @PathVariable("username") String username) {
        if (!dbUsuario.existsByUsername(username)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } else {
            ModeloUsuario usuarioExistente = dbUsuario.findByUsername(username).get();
            if (!username.equals(usuario.getUsername())) {
                if (dbUsuario.existsByUsername(usuario.getUsername())) {
                    return ResponseEntity.status(HttpStatus.CONFLICT).build();
                } else {
                    usuarioExistente.setUsername(usuario.getUsername());
                    Collection<ModeloEstablecimiento> establecimientos = dbEstablecimiento.findByIdAdministrador(username);
                    for (int i = 0; i < establecimientos.size(); i++) {
                        ((List<ModeloEstablecimiento>) establecimientos).get(i).setIdAdministrador(usuario.getUsername());
                        dbEstablecimiento.save(((List<ModeloEstablecimiento>) establecimientos).get(i));
                    }

                    Collection<ModeloExperimento> experimentos = dbExperimento.findByIdAdministrador(username);
                    for (int i = 0; i < experimentos.size(); i++) {
                        ((List<ModeloExperimento>) experimentos).get(i).setIdAdministrador(usuario.getUsername());
                        dbExperimento.save(((List<ModeloExperimento>) experimentos).get(i));
                    }

                    Collection<ModeloExperiencia> experiencias = dbExperiencia.findByIdCliente(username);
                    for (int i = 0; i < experiencias.size(); i++) {
                        ((List<ModeloExperiencia>) experiencias).get(i).setIdCliente(usuario.getUsername());
                        dbExperiencia.save(((List<ModeloExperiencia>) experiencias).get(i));
                    }
                    dbUsuario.deleteByUsername(username);
                }
            }
            usuarioExistente.setCorreoElectronico(usuario.getCorreoElectronico());
            usuarioExistente.setTelefonoContacto(usuario.getTelefonoContacto());
            usuarioExistente.setNombre(usuario.getNombre());
            usuarioExistente.setApellidos(usuario.getApellidos());

            dbUsuario.save(usuarioExistente);
            return ResponseEntity.ok().body(usuarioExistente.setPassword("*******"));
        }
    }

    @PreAuthorize("hasRole('CLIENTE') and principal==#username")
    @PutMapping(
            path = "clientes/{username}",
            produces = {MediaType.APPLICATION_JSON_UTF8_VALUE, MediaType.APPLICATION_XML_VALUE},
            consumes = {MediaType.APPLICATION_JSON_UTF8_VALUE, MediaType.APPLICATION_XML_VALUE}
    )

    public ResponseEntity modifyCliente(@RequestBody ModeloUsuario usuario, @PathVariable("username") String username) {
        if (!dbUsuario.existsByUsername(username)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } else {
            ModeloUsuario usuarioExistente = dbUsuario.findByUsername(username).get();
            if (!username.equals(usuario.getUsername())) {
                if (dbUsuario.existsByUsername(usuario.getUsername())) {
                    return ResponseEntity.status(HttpStatus.CONFLICT).build();
                }
                Collection<ModeloExperiencia> experiencias = dbExperiencia.findByIdCliente(username);
                for (int i = 0; i < experiencias.size(); i++) {
                    ((List<ModeloExperiencia>) experiencias).get(i).setIdCliente(usuario.getUsername());
                    dbExperiencia.save(((List<ModeloExperiencia>) experiencias).get(i));
                }
            }
            usuarioExistente.setCorreoElectronico(usuario.getCorreoElectronico());
            usuarioExistente.setTelefonoContacto(usuario.getTelefonoContacto());
            usuarioExistente.setNombre(usuario.getNombre());
            usuarioExistente.setApellidos(usuario.getApellidos());
            usuarioExistente.setFechaNacimiento(usuario.getFechaNacimiento());
            usuarioExistente.setOrigen(usuario.getOrigen());
            usuarioExistente.setNivelEstudios(usuario.getNivelEstudios());
            usuarioExistente.setSexo(usuario.getSexo());

            dbUsuario.save(usuarioExistente);
            return ResponseEntity.ok().body(usuarioExistente.setPassword("*******"));
        }
    }
}
