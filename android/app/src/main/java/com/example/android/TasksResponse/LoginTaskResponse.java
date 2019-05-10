package com.example.android.TasksResponse;

public interface LoginTaskResponse {
    void LoginFinishOK(String token, String idCliente);
    void LoginFinishERR();
}