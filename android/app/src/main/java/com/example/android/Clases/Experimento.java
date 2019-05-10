package com.example.android.Clases;

import com.google.gson.annotations.SerializedName;

import java.util.List;

public class Experimento {
    @SerializedName("idExperimento")
    private String idExperimento;
    @SerializedName("idAdministrador")
    private String idAdministrador;
    @SerializedName("nombreExperimento")
    private String nombreExperimento;
    @SerializedName("fechaCreacion")
    private String fechaCreacion;
    @SerializedName("fechasExperimento")
    private List<String> fechasExperimento;
    @SerializedName("objetivos")
    private List<Objetivo> objetivos;
    @SerializedName("preguntas")
    private List<Pregunta> preguntas;
    @SerializedName("idsEstablecimientos")
    private List<String> idsEstablecimientos;

    public String getIdExperimento() {
        return idExperimento;
    }

    public void setIdExperimento(String idExperimento) {
        this.idExperimento = idExperimento;
    }

    public String getIdAdministrador() {
        return idAdministrador;
    }

    public void setIdAdministrador(String idAdministrador) {
        this.idAdministrador = idAdministrador;
    }

    public String getNombreExperimento() {
        return nombreExperimento;
    }

    public void setNombreExperimento(String nombreExperimento) {
        this.nombreExperimento = nombreExperimento;
    }

    public String getFechaCreacion() {
        return fechaCreacion;
    }

    public void setFechaCreacion(String fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    public List<String> getFechasExperimento() {
        return fechasExperimento;
    }

    public void setFechasExperimento(List<String> fechasExperimento) {
        this.fechasExperimento = fechasExperimento;
    }

    public List<Objetivo> getObjetivos() {
        return objetivos;
    }

    public void setObjetivos(List<Objetivo> objetivos) {
        this.objetivos = objetivos;
    }

    public List<Pregunta> getPreguntas() {
        return preguntas;
    }

    public void setPreguntas(List<Pregunta> preguntas) {
        this.preguntas = preguntas;
    }

    public List<String> getIdsEstablecimientos() {
        return idsEstablecimientos;
    }

    public void setIdsEstablecimientos(List<String> idsEstablecimientos) {
        this.idsEstablecimientos = idsEstablecimientos;
    }
}
