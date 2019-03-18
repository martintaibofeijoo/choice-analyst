package usc.choiceanalyst.model.auxiliar;

import java.util.List;

public class Pregunta {
    private String idPregunta;
    private String variableAsociada;
    private String textoPregunta;
    private List<Opcion> opciones;

    public String getIdPregunta() {
        return idPregunta;
    }

    public void setIdPregunta(String idPregunta) {
        this.idPregunta = idPregunta;
    }

    public String getVariableAsociada() {
        return variableAsociada;
    }

    public void setVariableAsociada(String variableAsociada) {
        this.variableAsociada = variableAsociada;
    }

    public String getTextoPregunta() {
        return textoPregunta;
    }

    public void setTextoPregunta(String textoPregunta) {
        this.textoPregunta = textoPregunta;
    }

    public List<Opcion> getOpciones() {
        return opciones;
    }

    public void setOpciones(List<Opcion> opciones) {
        this.opciones = opciones;
    }
}
