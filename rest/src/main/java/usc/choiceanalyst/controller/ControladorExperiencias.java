package usc.choiceanalyst.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import usc.choiceanalyst.model.ModeloExperiencia;
import usc.choiceanalyst.repository.RepositorioExperiencia;



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
