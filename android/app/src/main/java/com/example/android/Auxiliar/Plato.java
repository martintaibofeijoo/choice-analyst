package com.example.android.Auxiliar;

import com.google.gson.annotations.SerializedName;

import java.util.List;

public class Plato {
    @SerializedName("nombrePlato")
    private String nombrePlato;
    @SerializedName("tipoPlato")
    private String tipoPlato;
    @SerializedName("precioPlato")
    private float precioPlato;
    @SerializedName("ingredientes")
    private List<Ingrediente> ingredientes;

    public String getNombrePlato() {
        return nombrePlato;
    }

    public void setNombrePlato(String nombrePlato) {
        this.nombrePlato = nombrePlato;
    }

    public String getTipoPlato() {
        return tipoPlato;
    }

    public void setTipoPlato(String tipoPlato) {
        this.tipoPlato = tipoPlato;
    }

    public float getPrecioPlato() {
        return precioPlato;
    }

    public void setPrecioPlato(float precioPlato) {
        this.precioPlato = precioPlato;
    }

    public List<Ingrediente> getIngredientes() {
        return ingredientes;
    }

    public void setIngredientes(List<Ingrediente> ingredientes) {
        this.ingredientes = ingredientes;
    }
}
