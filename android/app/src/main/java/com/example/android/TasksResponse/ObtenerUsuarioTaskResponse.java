package com.example.android.TasksResponse;


import com.example.android.Clases.Usuario;

public interface ObtenerUsuarioTaskResponse {
    void ObtenerUsuarioFinishOK(Usuario usuario);
    void ObtenerUsuarioFinishERR();
}