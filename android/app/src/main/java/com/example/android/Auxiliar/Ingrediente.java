package com.example.android.Auxiliar;

import com.google.gson.annotations.SerializedName;

public class Ingrediente {
    @SerializedName("textoIngrediente")
    private String textoIngrediente;

    public String getTextoIngrediente() {
        return textoIngrediente;
    }

    public void setTextoIngrediente(String textoIngrediente) {
        this.textoIngrediente = textoIngrediente;
    }
}
