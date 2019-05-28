package com.example.android.Clases;

import com.google.gson.annotations.SerializedName;

import java.io.Serializable;

public class Experiencia implements Serializable {
    @SerializedName("idCliente")
    private String idCliente;
    @SerializedName("fechaRealizacion")
    private String fechaRealizacion;
    @SerializedName("idExperimento")
    private String idExperimento;
    @SerializedName("idEstablecimiento")
    private String idEstablecimiento;
    @SerializedName("higiene")
    private String higiene;
    @SerializedName("ruido")
    private String ruido;
    @SerializedName("distancia")
    private String distancia;
    @SerializedName("energia")
    private String energia;
    @SerializedName("compania")
    private String compania;
    @SerializedName("atmosfera")
    private String atmosfera;
    @SerializedName("calidadServicio")
    private String calidadServicio;
    @SerializedName("apariencia")
    private String apariencia;
    @SerializedName("temperatura")
    private String temperatura;
    @SerializedName("saludable")
    private String saludable;
    @SerializedName("sabroso")
    private String sabroso;
    @SerializedName("menuSeleccionado")
    private String menuSeleccionado;
    @SerializedName("primerPlato")
    private String primerPlato;
    @SerializedName("segundoPlato")
    private String segundoPlato;
    @SerializedName("postre")
    private String postre;


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

    public String getIdEstablecimiento() {
        return idEstablecimiento;
    }

    public void setIdEstablecimiento(String idEstablecimiento) {
        this.idEstablecimiento = idEstablecimiento;
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
