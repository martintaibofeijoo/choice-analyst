package com.example.android.Clases;

import com.google.gson.annotations.SerializedName;

public class Opcion {
    @SerializedName("textoOpcion")
    private String textoOpcion;

    public String getTextoOpcion() {
        return textoOpcion;
    }

    public void setTextoOpcion(String textoOpcion) {
        this.textoOpcion = textoOpcion;
    }
}
