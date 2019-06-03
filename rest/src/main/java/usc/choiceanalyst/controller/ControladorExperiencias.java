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

    @PreAuthorize("hasRole('ADMINISTRADOR')")
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
                        datosGrafica.getValores().add(0);
                    }
                }
            }

            for (int i = 0; i < experiencias.size(); i++) {
                for (int j = 0; j < datosGrafica.getOpciones().size(); j++) {
                    if (experiencias.get(i).getHigiene().equals(datosGrafica.getOpciones().get(j))) {
                        datosGrafica.getValores().set(j, (datosGrafica.getValores().get(j) + 1));
                    }
                }
            }

        } else if (idVariable.equals("ruido")) {
            for (int i = 0; i < experimento.getPreguntas().size(); i++) {
                if (experimento.getPreguntas().get(i).getVariableAsociada().equals("Ruído")) {
                    for (int j = 0; j < experimento.getPreguntas().get(i).getOpciones().size(); j++) {
                        datosGrafica.getOpciones().add(experimento.getPreguntas().get(i).getOpciones().get(j).getTextoOpcion());
                        datosGrafica.getValores().add(0);
                    }
                }
            }

            for (int i = 0; i < experiencias.size(); i++) {
                for (int j = 0; j < datosGrafica.getOpciones().size(); j++) {
                    if (experiencias.get(i).getRuido().equals(datosGrafica.getOpciones().get(j))) {
                        datosGrafica.getValores().set(j, (datosGrafica.getValores().get(j) + 1));
                    }
                }
            }

        } else if (idVariable.equals("distancia")) {
            for (int i = 0; i < experimento.getPreguntas().size(); i++) {
                if (experimento.getPreguntas().get(i).getVariableAsociada().equals("Distancía")) {
                    for (int j = 0; j < experimento.getPreguntas().get(i).getOpciones().size(); j++) {
                        datosGrafica.getOpciones().add(experimento.getPreguntas().get(i).getOpciones().get(j).getTextoOpcion());
                        datosGrafica.getValores().add(0);
                    }
                }
            }

            for (int i = 0; i < experiencias.size(); i++) {
                for (int j = 0; j < datosGrafica.getOpciones().size(); j++) {
                    if (experiencias.get(i).getDistancia().equals(datosGrafica.getOpciones().get(j))) {
                        datosGrafica.getValores().set(j, (datosGrafica.getValores().get(j) + 1));
                    }
                }
            }
        } else if (idVariable.equals("energia")) {
            for (int i = 0; i < experimento.getPreguntas().size(); i++) {
                if (experimento.getPreguntas().get(i).getVariableAsociada().equals("Energía")) {
                    for (int j = 0; j < experimento.getPreguntas().get(i).getOpciones().size(); j++) {
                        datosGrafica.getOpciones().add(experimento.getPreguntas().get(i).getOpciones().get(j).getTextoOpcion());
                        datosGrafica.getValores().add(0);
                    }
                }
            }

            for (int i = 0; i < experiencias.size(); i++) {
                for (int j = 0; j < datosGrafica.getOpciones().size(); j++) {
                    if (experiencias.get(i).getEnergia().equals(datosGrafica.getOpciones().get(j))) {
                        datosGrafica.getValores().set(j, (datosGrafica.getValores().get(j) + 1));
                    }
                }
            }
        } else if (idVariable.equals("compania")) {
            for (int i = 0; i < experimento.getPreguntas().size(); i++) {
                if (experimento.getPreguntas().get(i).getVariableAsociada().equals("Compañía")) {
                    for (int j = 0; j < experimento.getPreguntas().get(i).getOpciones().size(); j++) {
                        datosGrafica.getOpciones().add(experimento.getPreguntas().get(i).getOpciones().get(j).getTextoOpcion());
                        datosGrafica.getValores().add(0);
                    }
                }
            }

            for (int i = 0; i < experiencias.size(); i++) {
                for (int j = 0; j < datosGrafica.getOpciones().size(); j++) {
                    if (experiencias.get(i).getCompania().equals(datosGrafica.getOpciones().get(j))) {
                        datosGrafica.getValores().set(j, (datosGrafica.getValores().get(j) + 1));
                    }
                }
            }
        } else if (idVariable.equals("atmosfera")) {
            for (int i = 0; i < experimento.getPreguntas().size(); i++) {
                if (experimento.getPreguntas().get(i).getVariableAsociada().equals("Atmósfera")) {
                    for (int j = 0; j < experimento.getPreguntas().get(i).getOpciones().size(); j++) {
                        datosGrafica.getOpciones().add(experimento.getPreguntas().get(i).getOpciones().get(j).getTextoOpcion());
                        datosGrafica.getValores().add(0);
                    }
                }
            }

            for (int i = 0; i < experiencias.size(); i++) {
                for (int j = 0; j < datosGrafica.getOpciones().size(); j++) {
                    if (experiencias.get(i).getAtmosfera().equals(datosGrafica.getOpciones().get(j))) {
                        datosGrafica.getValores().set(j, (datosGrafica.getValores().get(j) + 1));
                    }
                }
            }
        } else if (idVariable.equals("calidad-de-servicio")) {
            for (int i = 0; i < experimento.getPreguntas().size(); i++) {
                if (experimento.getPreguntas().get(i).getVariableAsociada().equals("Calidad de Servicio")) {
                    for (int j = 0; j < experimento.getPreguntas().get(i).getOpciones().size(); j++) {
                        datosGrafica.getOpciones().add(experimento.getPreguntas().get(i).getOpciones().get(j).getTextoOpcion());
                        datosGrafica.getValores().add(0);
                    }
                }
            }

            for (int i = 0; i < experiencias.size(); i++) {
                for (int j = 0; j < datosGrafica.getOpciones().size(); j++) {
                    if (experiencias.get(i).getCalidadServicio().equals(datosGrafica.getOpciones().get(j))) {
                        datosGrafica.getValores().set(j, (datosGrafica.getValores().get(j) + 1));
                    }
                }
            }
        } else if (idVariable.equals("apariencia")) {
            //Apariencia
            for (int i = 0; i < experimento.getPreguntas().size(); i++) {
                if (experimento.getPreguntas().get(i).getVariableAsociada().equals("Apariencia")) {
                    for (int j = 0; j < experimento.getPreguntas().get(i).getOpciones().size(); j++) {
                        datosGrafica.getOpciones().add(experimento.getPreguntas().get(i).getOpciones().get(j).getTextoOpcion());
                        datosGrafica.getValores().add(0);
                    }
                }
            }

            for (int i = 0; i < experiencias.size(); i++) {
                for (int j = 0; j < datosGrafica.getOpciones().size(); j++) {
                    if (experiencias.get(i).getApariencia().equals(datosGrafica.getOpciones().get(j))) {
                        datosGrafica.getValores().set(j, (datosGrafica.getValores().get(j) + 1));
                    }
                }
            }

        } else if (idVariable.equals("temperatura")) {
            for (int i = 0; i < experimento.getPreguntas().size(); i++) {
                if (experimento.getPreguntas().get(i).getVariableAsociada().equals("Temperatura")) {
                    for (int j = 0; j < experimento.getPreguntas().get(i).getOpciones().size(); j++) {
                        datosGrafica.getOpciones().add(experimento.getPreguntas().get(i).getOpciones().get(j).getTextoOpcion());
                        datosGrafica.getValores().add(0);
                    }
                }
            }

            for (int i = 0; i < experiencias.size(); i++) {
                for (int j = 0; j < datosGrafica.getOpciones().size(); j++) {
                    if (experiencias.get(i).getTemperatura().equals(datosGrafica.getOpciones().get(j))) {
                        datosGrafica.getValores().set(j, (datosGrafica.getValores().get(j) + 1));
                    }
                }
            }
        } else if (idVariable.equals("saludable")) {
            for (int i = 0; i < experimento.getPreguntas().size(); i++) {
                if (experimento.getPreguntas().get(i).getVariableAsociada().equals("Saludable")) {
                    for (int j = 0; j < experimento.getPreguntas().get(i).getOpciones().size(); j++) {
                        datosGrafica.getOpciones().add(experimento.getPreguntas().get(i).getOpciones().get(j).getTextoOpcion());
                        datosGrafica.getValores().add(0);
                    }
                }
            }

            for (int i = 0; i < experiencias.size(); i++) {
                for (int j = 0; j < datosGrafica.getOpciones().size(); j++) {
                    if (experiencias.get(i).getSaludable().equals(datosGrafica.getOpciones().get(j))) {
                        datosGrafica.getValores().set(j, (datosGrafica.getValores().get(j) + 1));
                    }
                }
            }
        } else if (idVariable.equals("sabroso")) {
            for (int i = 0; i < experimento.getPreguntas().size(); i++) {
                if (experimento.getPreguntas().get(i).getVariableAsociada().equals("Sabroso")) {
                    for (int j = 0; j < experimento.getPreguntas().get(i).getOpciones().size(); j++) {
                        datosGrafica.getOpciones().add(experimento.getPreguntas().get(i).getOpciones().get(j).getTextoOpcion());
                        datosGrafica.getValores().add(0);
                    }
                }
            }

            for (int i = 0; i < experiencias.size(); i++) {
                for (int j = 0; j < datosGrafica.getOpciones().size(); j++) {
                    if (experiencias.get(i).getSabroso().equals(datosGrafica.getOpciones().get(j))) {
                        datosGrafica.getValores().set(j, (datosGrafica.getValores().get(j) + 1));
                    }
                }
            }
        } else if (idVariable.equals("menu-seleccionado")) {
            for (int i = 0; i < establecimiento.getMenus().size(); i++) {
                for (int j = 0; j < experimento.getFechasExperimento().size(); j++) {
                    if (establecimiento.getMenus().get(i).getFechasMenu().contains(experimento.getFechasExperimento().get(j))) {
                        if (!datosGrafica.getOpciones().contains(establecimiento.getMenus().get(i).getNombreMenu())) {
                            datosGrafica.getOpciones().add(establecimiento.getMenus().get(i).getNombreMenu());
                            datosGrafica.getValores().add(0);
                            break;
                        }
                    }
                }
            }

            for (int i = 0; i < experiencias.size(); i++) {
                for (int j = 0; j < datosGrafica.getOpciones().size(); j++) {
                    if (experiencias.get(i).getMenuSeleccionado().equals(datosGrafica.getOpciones().get(j))) {
                        datosGrafica.getValores().set(j, (datosGrafica.getValores().get(j) + 1));
                    }
                }
            }
        }


        return ResponseEntity.ok().body(datosGrafica);

    }


    @PreAuthorize("hasRole('ADMINISTRADOR')")
    @GetMapping(
            path = "/{idExperimento}/{idEstablecimiento}/menus/{idMenu}/{idVariable}",
            produces = {MediaType.APPLICATION_JSON_UTF8_VALUE, MediaType.APPLICATION_XML_VALUE}
    )
    public ResponseEntity<DatosGrafica> getPlatosMenuExperiencia(@PathVariable("idExperimento") String idExperimento, @PathVariable("idEstablecimiento") String idEstablecimiento, @PathVariable("idMenu") String idMenu, @PathVariable("idVariable") String idVariable) {
        DatosGrafica datosGrafica = new DatosGrafica();
        ModeloExperimento experimento = dbExperimento.findByIdExperimento(idExperimento).get();
        ModeloEstablecimiento establecimiento = dbEstablecimiento.findByIdEstablecimiento(idEstablecimiento).get();
        List<ModeloExperiencia> experiencias = dbExperiencia.findByIdEstablecimientoAndIdExperimento(idEstablecimiento, idExperimento);


        if (idVariable.equals("primer-plato")) {
            //Primer Plato
            for (int i = 0; i < establecimiento.getMenus().size(); i++) {
                if (establecimiento.getMenus().get(i).getIdMenu().equals(idMenu)) {
                    for (int j = 0; j < establecimiento.getMenus().get(i).getPlatos().size(); j++) {
                        if (establecimiento.getMenus().get(i).getPlatos().get(j).getTipoPlato().equals("PrimerPlato")) {
                            datosGrafica.getOpciones().add(establecimiento.getMenus().get(i).getPlatos().get(j).getNombrePlato());
                            datosGrafica.getValores().add(0);
                        }
                    }
                }
            }

            /*for (int i = 0; i < experiencias.size(); i++) {
                for (int j = 0; j < datosGrafica.getOpciones().size(); j++) {
                    if (experiencias.get(i).getPrimerPlato().equals(datosGrafica.getOpciones().get(j))) {
                        datosGrafica.getValores().set(j, (datosGrafica.getValores().get(j) + 1));
                    }
                }
            }*/
        } else if (idVariable.equals("segundo-plato")) {
            //Segundo Plato
            for (int i = 0; i < establecimiento.getMenus().size(); i++) {
                if (establecimiento.getMenus().get(i).getIdMenu().equals(idMenu)) {
                    for (int j = 0; j < establecimiento.getMenus().get(i).getPlatos().size(); j++) {
                        if (establecimiento.getMenus().get(i).getPlatos().get(j).getTipoPlato().equals("SegundoPlato")) {
                            datosGrafica.getOpciones().add(establecimiento.getMenus().get(i).getPlatos().get(j).getNombrePlato());
                            datosGrafica.getValores().add(0);
                        }
                    }
                }
            }

            /*for (int i = 0; i < experiencias.size(); i++) {
                for (int j = 0; j < datosGrafica.getOpciones().size(); j++) {
                    if (experiencias.get(i).getSegundoPlato().equals(datosGrafica.getOpciones().get(j))) {
                        datosGrafica.getValores().set(j, (datosGrafica.getValores().get(j) + 1));
                    }
                }
            }*/
        } else if (idVariable.equals("postre")) {
            //Postre
            for (int i = 0; i < establecimiento.getMenus().size(); i++) {
                if (establecimiento.getMenus().get(i).getIdMenu().equals(idMenu)) {
                    for (int j = 0; j < establecimiento.getMenus().get(i).getPlatos().size(); j++) {
                        if (establecimiento.getMenus().get(i).getPlatos().get(j).getTipoPlato().equals("Postre")) {
                            datosGrafica.getOpciones().add(establecimiento.getMenus().get(i).getPlatos().get(j).getNombrePlato());
                            datosGrafica.getValores().add(0);
                        }
                    }
                }
            }

           /* for (int i = 0; i < experiencias.size(); i++) {
                for (int j = 0; j < datosGrafica.getOpciones().size(); j++) {
                    if (experiencias.get(i).getPostre().equals(datosGrafica.getOpciones().get(j))) {
                        datosGrafica.getValores().set(j, (datosGrafica.getValores().get(j) + 1));
                    }
                }
            }*/
        }

        return ResponseEntity.ok().body(datosGrafica);

    }


}
