package com.example.android.Clases;

import com.google.gson.annotations.SerializedName;

public class Objetivo {
    @SerializedName("textoObjetivo")
    private String textoObjetivo;

    public String getTextoObjetivo() {
        return textoObjetivo;
    }

    public void setTextoObjetivo(String textoObjetivo) {
        this.textoObjetivo = textoObjetivo;
    }
}
