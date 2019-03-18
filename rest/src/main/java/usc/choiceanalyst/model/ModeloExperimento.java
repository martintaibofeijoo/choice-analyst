package usc.choiceanalyst.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import usc.choiceanalyst.model.auxiliar.Filtro;
import usc.choiceanalyst.model.auxiliar.Pregunta;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;


@Document(collection = "experimentos")

public class ModeloExperimento {

    @Id private String idExperimento;
    private String idAdministrador;
    private String idEstablecimiento;
    private String nombre;
    private String fechaCreacion;
    private List<String> objetivos;
    private List<Filtro> filtros;
    private List<Pregunta> preguntas;



    public ModeloExperimento(){
        String pattern = "dd-MM-yyyy";
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
        String date = simpleDateFormat.format(new Date());
        this.fechaCreacion =date;

    }

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

    public String getIdEstablecimiento() {
        return idEstablecimiento;
    }

    public void setIdEstablecimiento(String idEstablecimiento) {
        this.idEstablecimiento = idEstablecimiento;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getFechaCreacion() {
        return fechaCreacion;
    }

    public void setFechaCreacion(String fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    public List<String> getObjetivos() {
        return objetivos;
    }

    public void setObjetivos(List<String> objetivos) {
        this.objetivos = objetivos;
    }

    public List<Filtro> getFiltros() {
        return filtros;
    }

    public void setFiltros(List<Filtro> filtros) {
        this.filtros = filtros;
    }

    public List<Pregunta> getPreguntas() {
        return preguntas;
    }

    public void setPreguntas(List<Pregunta> preguntas) {
        this.preguntas = preguntas;
    }
}
