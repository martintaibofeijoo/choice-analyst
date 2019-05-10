package com.example.android.Clases;

import com.google.gson.annotations.SerializedName;

import java.io.Serializable;
import java.util.List;

public class Menu implements Serializable {
    @SerializedName("idMenu")
    private String idMenu;
    @SerializedName("nombreMenu")
    private String nombreMenu;
    @SerializedName("precio")
    private String precio;
    @SerializedName("fechasMenu")
    private List<String> fechasMenu;
    @SerializedName("platos")
    private List<Plato> platos;

    public String getIdMenu() {
        return idMenu;
    }

    public void setIdMenu(String idMenu) {
        this.idMenu = idMenu;
    }

    public String getNombreMenu() {
        return nombreMenu;
    }

    public void setNombreMenu(String nombreMenu) {
        this.nombreMenu = nombreMenu;
    }

    public String getPrecio() {
        return precio;
    }

    public void setPrecio(String precio) {
        this.precio = precio;
    }

    public List<String> getFechasMenu() {
        return fechasMenu;
    }

    public void setFechasMenu(List<String> fechasMenu) {
        this.fechasMenu = fechasMenu;
    }

    public List<Plato> getPlatos() {
        return platos;
    }

    public void setPlatos(List<Plato> platos) {
        this.platos = platos;
    }
}
