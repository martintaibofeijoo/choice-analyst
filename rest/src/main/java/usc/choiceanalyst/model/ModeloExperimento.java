package usc.choiceanalyst.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import usc.choiceanalyst.model.auxiliar.*;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;


@Document(collection = "experimentos")

public class ModeloExperimento {

    @Id
    private String idExperimento;
    private String idAdministrador;
    private String nombreExperimento;
    private String fechaCreacion;
    private List<String> fechasExperimento;
    private List<Objetivo> objetivos;
    private List<Pregunta> preguntas;
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

    public List<Pregunta> getPreguntas() {
        return preguntas;
    }

    public void setPreguntas(List<Pregunta> preguntas) {
        this.preguntas = preguntas;
    }

    public List<Objetivo> getObjetivos() {
        return objetivos;
    }

    public void setObjetivos(List<Objetivo> objetivos) {
        this.objetivos = objetivos;
    }

    public List<String> getFechasExperimento() {
        return fechasExperimento;
    }

    public void setFechasExperimento(List<String> fechasExperimento) {
        this.fechasExperimento = fechasExperimento;
    }

    public List<String> getIdsEstablecimientos() {
        return idsEstablecimientos;
    }

    public void setIdsEstablecimientos(List<String> idsEstablecimientos) { this.idsEstablecimientos = idsEstablecimientos; }

}
