package usc.choiceanalyst.controller;

import usc.choiceanalyst.model.ModeloEstablecimiento;
import usc.choiceanalyst.model.ModeloUsuario;
import java.net.URI;
import java.text.SimpleDateFormat;
import java.util.*;

import usc.choiceanalyst.model.auxiliar.Menu;
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

    @PreAuthorize("permitAll()")
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
        return ResponseEntity.ok(dbu.findAll(Example.of(usuario),PageRequest.of(page, size, criteria)));
    }


    @PreAuthorize("principal == #username || hasRole('ADMINISTRADOR')")
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

    public ResponseEntity createUser(@RequestBody ModeloUsuario usuario, String localizacionEstablecimiento, String tipoEstablecimiento) {
        if (dbu.existsByUsername(usuario.getUsername())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        } else {
            System.out.println(localizacionEstablecimiento);
            System.out.println(tipoEstablecimiento);
            String pattern = "dd-MM-yyyy";
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
            usuario.setFechaRegistro(simpleDateFormat.format(new Date()));
            usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));

            if(usuario.getIdEstablecimiento()!=null){
                usuario.setRol("ADMINISTRADOR");
                String nombreEstablecimiento = usuario.getIdEstablecimiento();
                String idEstablecimiento= usuario.getIdEstablecimiento();

                idEstablecimiento = Normalizer.normalize(idEstablecimiento, Normalizer.Form.NFD);
                idEstablecimiento = idEstablecimiento.replaceAll("[^\\p{ASCII}]", "");
                idEstablecimiento=idEstablecimiento.replace(" ","-");
                idEstablecimiento=idEstablecimiento.toLowerCase();
                usuario.setIdEstablecimiento(idEstablecimiento);

                if(dbes.existsByIdEstablecimiento(idEstablecimiento)){
                    return ResponseEntity.status(HttpStatus.CONFLICT).build();
                }else{
                    ModeloEstablecimiento establecimiento = new ModeloEstablecimiento(usuario.getIdEstablecimiento(), usuario.getUsername(), nombreEstablecimiento, localizacionEstablecimiento, tipoEstablecimiento);
                    dbes.save(establecimiento);
                }

            }

            dbu.save(usuario);

            URI location = ServletUriComponentsBuilder.fromCurrentContextPath().path("/usuarios/{username}").buildAndExpand(usuario.getUsername()).toUri();
            return ResponseEntity.created(location).body(usuario.setPassword("*********"));
        }
    }

    @PreAuthorize("(hasRole('CLIENTE') and principal == #username) or hasRole('ADMINISTRADOR')")
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
