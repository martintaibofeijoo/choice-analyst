package usc.choiceanalyst.model;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.text.SimpleDateFormat;
import java.util.Date;


@Document(collection = "experiencias")

public class ModeloExperiencia {

    private String idCliente;
    private String fechaRealizacion;
    private String idExperimento;
    private String higiene;
    private String ruido;
    private String distancia;
    private String energia;
    private String compania;
    private String atmosfera;
    private String calidadServicio;
    private String apariencia;
    private String temperatura;
    private String saludable;
    private String sabroso;
    private String menuSeleccionado;
    private String primerPlato;
    private String segundoPlato;
    private String postre;


    public ModeloExperiencia(){
        String pattern = "dd-MM-yyyy";
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
        String date = simpleDateFormat.format(new Date());
        this.fechaRealizacion =date;

    }

    public String getIdCliente() {
        return idCliente;
    }

    public void setIdCliente(String idCliente) {
        this.idCliente = idCliente;
    }

    public String getFechaRealizacion() {
        return fechaRealizacion;
    }

    public void setFechaRealizacion(String fechaRealizacion) {
        this.fechaRealizacion = fechaRealizacion;
    }

    public String getIdExperimento() {
        return idExperimento;
    }

    public void setIdExperimento(String idExperimento) {
        this.idExperimento = idExperimento;
    }

    public String getHigiene() {
        return higiene;
    }

    public void setHigiene(String higiene) {
        this.higiene = higiene;
    }

    public String getRuido() {
        return ruido;
    }

    public void setRuido(String ruido) {
        this.ruido = ruido;
    }

    public String getDistancia() {
        return distancia;
    }

    public void setDistancia(String distancia) {
        this.distancia = distancia;
    }

    public String getEnergia() {
        return energia;
    }

    public void setEnergia(String energia) {
        this.energia = energia;
    }

    public String getCompania() {
        return compania;
    }

    public void setCompania(String compania) {
        this.compania = compania;
    }

    public String getAtmosfera() {
        return atmosfera;
    }

    public void setAtmosfera(String atmosfera) {
        this.atmosfera = atmosfera;
    }

    public String getCalidadServicio() {
        return calidadServicio;
    }

    public void setCalidadServicio(String calidadServicio) {
        this.calidadServicio = calidadServicio;
    }

    public String getApariencia() {
        return apariencia;
    }

    public void setApariencia(String apariencia) {
        this.apariencia = apariencia;
    }

    public String getTemperatura() {
        return temperatura;
    }

    public void setTemperatura(String temperatura) {
        this.temperatura = temperatura;
    }

    public String getSaludable() {
        return saludable;
    }

    public void setSaludable(String saludable) {
        this.saludable = saludable;
    }

    public String getSabroso() {
        return sabroso;
    }

    public void setSabroso(String sabroso) {
        this.sabroso = sabroso;
    }

    public String getMenuSeleccionado() {
        return menuSeleccionado;
    }

    public void setMenuSeleccionado(String menuSeleccionado) {
        this.menuSeleccionado = menuSeleccionado;
    }

    public String getPrimerPlato() {
        return primerPlato;
    }

    public void setPrimerPlato(String primerPlato) {
        this.primerPlato = primerPlato;
    }

    public String getSegundoPlato() {
        return segundoPlato;
    }

    public void setSegundoPlato(String segundoPlato) {
        this.segundoPlato = segundoPlato;
    }

    public String getPostre() {
        return postre;
    }

    public void setPostre(String postre) {
        this.postre = postre;
    }
}
