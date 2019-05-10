package com.example.android.Clases;

import com.google.gson.annotations.SerializedName;

import java.util.List;

public class Pregunta {
    @SerializedName("variableAsociada")
    private String variableAsociada;
    @SerializedName("textoPregunta")
    private String textoPregunta;
    @SerializedName("opciones")
    private List<Opcion> opciones;

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
