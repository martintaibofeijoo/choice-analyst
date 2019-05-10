package com.example.android.Clases;

import com.google.gson.annotations.SerializedName;

import java.io.Serializable;
import java.util.List;

public class Establecimiento implements Serializable {

    @SerializedName("idEstablecimiento")
    private String idEstablecimiento;
    @SerializedName("idAdministrador")
    private String idAdministrador;
    @SerializedName("nombreEstablecimiento")
    private String nombreEstablecimiento;
    @SerializedName("localizacionEstablecimiento")
    private String localizacionEstablecimiento;
    @SerializedName("tipoEstablecimiento")
    private String tipoEstablecimiento;
    @SerializedName("menus")
    private List<Menu> menus;

    public String getIdEstablecimiento() {
        return idEstablecimiento;
    }

    public void setIdEstablecimiento(String idEstablecimiento) {
        this.idEstablecimiento = idEstablecimiento;
    }

    public String getIdAdministrador() {
        return idAdministrador;
    }

    public void setIdAdministrador(String idAdministrador) {
        this.idAdministrador = idAdministrador;
    }

    public String getNombreEstablecimiento() {
        return nombreEstablecimiento;
    }

    public void setNombreEstablecimiento(String nombreEstablecimiento) {
        this.nombreEstablecimiento = nombreEstablecimiento;
    }

    public String getLocalizacionEstablecimiento() {
        return localizacionEstablecimiento;
    }

    public void setLocalizacionEstablecimiento(String localizacionEstablecimiento) {
        this.localizacionEstablecimiento = localizacionEstablecimiento;
    }

    public String getTipoEstablecimiento() {
        return tipoEstablecimiento;
    }

    public void setTipoEstablecimiento(String tipoEstablecimiento) {
        this.tipoEstablecimiento = tipoEstablecimiento;
    }

    public List<Menu> getMenus() {
        return menus;
    }

    public void setMenus(List<Menu> menus) {
        this.menus = menus;
    }
}
