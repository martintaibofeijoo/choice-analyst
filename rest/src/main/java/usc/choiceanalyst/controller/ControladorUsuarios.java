package usc.choiceanalyst.controller;

import usc.choiceanalyst.model.ModeloEstablecimiento;
import usc.choiceanalyst.model.ModeloExperimento;
import usc.choiceanalyst.model.ModeloUsuario;

import java.net.URI;
import java.text.SimpleDateFormat;
import java.util.*;

import usc.choiceanalyst.repository.RepositorioEstablecimiento;
import usc.choiceanalyst.repository.RepositorioUsuario;
import org.springframework.beans.factory.annotation.Autowired;
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
import org.springframework.data.domain.Example;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.text.Normalizer;

@RestController
@RequestMapping("usuarios")
public class ControladorUsuarios {

    private RepositorioUsuario dbu;
    private RepositorioEstablecimiento dbes;
    private PasswordEncoder passwordEncoder;


    @Autowired
    public ControladorUsuarios(RepositorioUsuario dbu, RepositorioEstablecimiento dbes, PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
        this.dbu = dbu;
        this.dbes = dbes;

    }

    @PreAuthorize("hasRole('CLIENTE') and principal==#username")
    @GetMapping(
            path = "/{username}",
            produces = {MediaType.APPLICATION_JSON_UTF8_VALUE, MediaType.APPLICATION_XML_VALUE}
    )
    public ResponseEntity<ModeloUsuario> getUser(@PathVariable("username") String username) {
        if (dbu.existsByUsername(username)) {
            return ResponseEntity.ok().body(dbu.findByUsername(username).get());

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
        return ResponseEntity.ok(dbu.findAll(Example.of(usuario), PageRequest.of(page, size, criteria)));
    }


    @PreAuthorize("hasRole('CLIENTE') and principal==#username")
    @DeleteMapping(path = "/{username}")
    public ResponseEntity deleteUser(@PathVariable("username") String username) {
        if (!dbu.existsByUsername(username)) {
            return ResponseEntity.notFound().build();
        } else {
            dbu.deleteByUsername(username);
            return ResponseEntity.noContent().build();
        }
    }

    @PreAuthorize("permitAll()")
    @PostMapping(
            produces = {MediaType.APPLICATION_JSON_UTF8_VALUE, MediaType.APPLICATION_XML_VALUE},
            consumes = {MediaType.APPLICATION_JSON_UTF8_VALUE, MediaType.APPLICATION_XML_VALUE}
    )

    public ResponseEntity createAdministrador(@RequestBody ModeloUsuario usuario) {
        if (dbu.existsByUsername(usuario.getUsername())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        } else {
            String pattern = "dd-MM-yyyy";
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
            usuario.setFechaRegistro(simpleDateFormat.format(new Date()));
            usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
            usuario.setRol("ADMINISTRADOR");
            dbu.save(usuario);
            URI location = ServletUriComponentsBuilder.fromCurrentContextPath().path("/usuarios/{username}").buildAndExpand(usuario.getUsername()).toUri();
            return ResponseEntity.created(location).body(usuario.setPassword("*********"));
        }
    }

    @PreAuthorize("hasRole('CLIENTE') and principal==#username")
    @PutMapping(
            path = "/{username}",
            produces = {MediaType.APPLICATION_JSON_UTF8_VALUE, MediaType.APPLICATION_XML_VALUE},
            consumes = {MediaType.APPLICATION_JSON_UTF8_VALUE, MediaType.APPLICATION_XML_VALUE}
    )

    public ResponseEntity modifyUser(@RequestBody ModeloUsuario usuario, @PathVariable("username") String username) {
        if (!dbu.existsByUsername(username)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } else {
            Optional<ModeloUsuario> usuarioExistente = dbu.findByUsername(username);
            usuarioExistente.get().setCorreoElectronico(usuario.getCorreoElectronico());
            usuarioExistente.get().setPassword(passwordEncoder.encode(usuario.getPassword()));
            usuarioExistente.get().setPassword(passwordEncoder.encode(usuario.getPassword()));

            usuarioExistente.get().setUsername(usuario.getUsername());

            dbu.save(usuarioExistente.get());
            return ResponseEntity.ok().body(usuarioExistente.get().setPassword("*******"));
        }
    }


}
