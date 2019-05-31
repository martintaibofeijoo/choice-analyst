package usc.choiceanalyst.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import usc.choiceanalyst.model.ModeloEstablecimiento;
import usc.choiceanalyst.model.ModeloExperiencia;
import usc.choiceanalyst.model.ModeloExperimento;
import usc.choiceanalyst.model.auxiliar.DatosGrafica;
import usc.choiceanalyst.repository.RepositorioEstablecimiento;
import usc.choiceanalyst.repository.RepositorioExperiencia;
import usc.choiceanalyst.repository.RepositorioExperimento;
import usc.choiceanalyst.repository.RepositorioUsuario;

import java.util.ArrayList;
import java.util.List;


@RestController
@RequestMapping("experiencias")
public class ControladorExperiencias {

    private RepositorioUsuario dbUsuario;
    private RepositorioEstablecimiento dbEstablecimiento;
    private RepositorioExperimento dbExperimento;
    private RepositorioExperiencia dbExperiencia;


    @Autowired
    public ControladorExperiencias(RepositorioExperimento dbExperimento, RepositorioEstablecimiento dbEstablecimiento, RepositorioUsuario dbUsuario, RepositorioExperiencia dbExperiencia) {
        this.dbExperimento = dbExperimento;
        this.dbEstablecimiento = dbEstablecimiento;
        this.dbUsuario = dbUsuario;
        this.dbExperiencia = dbExperiencia;
    }


    //hasRole('CLIENTE')
    @PreAuthorize("permitAll()")
    @PostMapping(
            produces = {MediaType.APPLICATION_JSON_UTF8_VALUE, MediaType.APPLICATION_XML_VALUE},
            consumes = {MediaType.APPLICATION_JSON_UTF8_VALUE, MediaType.APPLICATION_XML_VALUE}
    )

    public ResponseEntity createExperiencia(@RequestBody ModeloExperiencia experiencia) {
        dbExperiencia.save(experiencia);
        return ResponseEntity.ok().body(experiencia);
    }

    @PreAuthorize("permitAll()")
    @GetMapping(
            path = "/{idExperimento}/{idEstablecimiento}/{idVariable}",
            produces = {MediaType.APPLICATION_JSON_UTF8_VALUE, MediaType.APPLICATION_XML_VALUE}
    )
    public ResponseEntity<DatosGrafica> getDatosExperiencia(@PathVariable("idExperimento") String idExperimento, @PathVariable("idEstablecimiento") String idEstablecimiento, @PathVariable("idVariable") String idVariable) {
        DatosGrafica datosGrafica = new DatosGrafica();
        ModeloExperimento experimento = dbExperimento.findByIdExperimento(idExperimento).get();
        ModeloEstablecimiento establecimiento = dbEstablecimiento.findByIdEstablecimiento(idEstablecimiento).get();

        List<ModeloExperiencia> experiencias = dbExperiencia.findByIdEstablecimientoAndIdExperimento(idEstablecimiento, idExperimento);

        if (idVariable.equals("higiene")) {
            for (int i = 0; i < experimento.getPreguntas().size(); i++) {
                if (experimento.getPreguntas().get(i).getVariableAsociada().equals("Higiene")) {
                    for (int j = 0; j < experimento.getPreguntas().get(i).getOpciones().size(); j++) {
                        datosGrafica.getOpciones().add(experimento.getPreguntas().get(i).getOpciones().get(j).getTextoOpcion());
                    }
                }
            }

            for(int i=0; i<experiencias.size();i++){
                for(int j=0; j<datosGrafica.getOpciones().size();j++){
                    if(experiencias.get(i).getHigiene().equals(datosGrafica.getOpciones().get(j))){
                        datosGrafica.getValores().set(j,(datosGrafica.getValores().get(j)+1));
                    }
                }
            }
            System.out.println("hola");

        } else if (idVariable.equals("ruido")) {

        }



        return ResponseEntity.ok().body(datosGrafica);


    }

}
