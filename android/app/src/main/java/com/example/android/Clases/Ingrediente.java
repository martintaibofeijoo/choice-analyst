package com.example.android.Clases;

import com.google.gson.annotations.SerializedName;

import java.io.Serializable;

public class Ingrediente implements Serializable {
    @SerializedName("textoIngrediente")
    private String textoIngrediente;

    public String getTextoIngrediente() {
        return textoIngrediente;
    }

    public void setTextoIngrediente(String textoIngrediente) {
        this.textoIngrediente = textoIngrediente;
    }
}
