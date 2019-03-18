package usc.choiceanalyst.controller;

import usc.choiceanalyst.model.ModeloUsuario;

import java.net.URI;
import java.util.*;
import java.util.stream.Collectors;

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
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
@RequestMapping("usuarios")
public class ControladorUsuarios {

    private RepositorioUsuario dbu;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public ControladorUsuarios(RepositorioUsuario dbu, PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
        this.dbu = dbu;

    }

    @PreAuthorize("permitAll()")
    @GetMapping(
            path = "/{username}",
            produces = {MediaType.APPLICATION_JSON_UTF8_VALUE, MediaType.APPLICATION_XML_VALUE}
    )
    public ResponseEntity<ModeloUsuario> getUser(@PathVariable("username") String username) {
        if (dbu.existsByUsername(username)) {
            return ResponseEntity.ok()
                    .body(dbu.findByUsername(username).get().setPassword("*******"));
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

        if (!rol.isEmpty()) {
            if (rol.equals("ROLE_WRITER")) {
                return ResponseEntity.ok(dbu.findAllByRolesContaining("WRITER",PageRequest.of(page, size, criteria)));
            }
        }
        return ResponseEntity.ok(dbu.findAll(PageRequest.of(page, size, criteria)));
    }
   

    @PreAuthorize("(hasRole('READER') and principal == #username) or hasRole('ADMIN')")
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

    public ResponseEntity createUser(@RequestBody ModeloUsuario data) {
        if (dbu.existsByUsername(data.getUsername())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        } else {
            List<String> roles = new ArrayList<>();
            roles.add("READER");

            ModeloUsuario user = new ModeloUsuario(data.getCorreoElectronico(), roles);
            user.setUsername(data.getUsername());
            user.setPassword(passwordEncoder.encode(data.getPassword()));
            dbu.save(user);

            URI location = ServletUriComponentsBuilder.fromCurrentContextPath().path("/users/{username}").buildAndExpand(user.getUsername()).toUri();
            return ResponseEntity.created(location).body(user.setPassword("*********"));
        }
    }

    @PreAuthorize("(hasRole('READER') and principal == #username) or hasRole('ADMIN') or hasRole('MODERATOR')")
    @PutMapping(
            path = "/{username}",
            produces = {MediaType.APPLICATION_JSON_UTF8_VALUE, MediaType.APPLICATION_XML_VALUE},
            consumes = {MediaType.APPLICATION_JSON_UTF8_VALUE, MediaType.APPLICATION_XML_VALUE}
    )

    public ResponseEntity modifyUser(@RequestBody ModeloUsuario data, @PathVariable("username") String username) {
        if (!dbu.existsByUsername(username)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } else {
            Optional<ModeloUsuario> user = dbu.findByUsername(username);
            if (SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString().equals(username)) {
                if (data.getCorreoElectronico() != null) {
                    user.get().setCorreoElectronico(data.getCorreoElectronico());
                }
                if (data.getPassword() != null) {
                    user.get().setPassword(passwordEncoder.encode(data.getPassword()));
                }
                if (data.getUsername() != null) {
                    user.get().setUsername(data.getUsername());
                }

            }
            
            /*if (SecurityContextHolder.getContext().getAuthentication().getAuthorities().stream().map(x -> x.getAuthority()).collect(Collectors.toList()).contains("ROLE_ADMIN")) {
                if (data.getRoles() != null) {
                    user.get().setRoles(data.getRoles());
                }

                if (data.getActivo() == true || data.getActivo()==false) {
                    user.get().setActivo(data.getActivo());
                }
            }
            
            if (SecurityContextHolder.getContext().getAuthentication().getAuthorities().stream().map(x -> x.getAuthority()).collect(Collectors.toList()).contains("ROLE_MODERATOR")) {
                if (data.getActivo() == true || data.getActivo()==false) {
                    user.get().setActivo(data.getActivo());
                }
            }*/

            dbu.save(user.get());
            return ResponseEntity.ok().body(user.get().setPassword("*******"));
        }
    }


}
