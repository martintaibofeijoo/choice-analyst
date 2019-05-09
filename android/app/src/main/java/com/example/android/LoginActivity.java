package com.example.android;

import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import com.example.android.Auxiliar.LoginTaskResponse;

public class LoginActivity extends AppCompatActivity implements LoginTaskResponse {

    private Button botonLogin;
    private EditText textoUsuario;
    private EditText textoContrasena;
    private TextView textViewRegistro;
    private AlertDialog.Builder builder;
    private LoginTask loginTask;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        botonLogin=findViewById(R.id.botonFinalizarExperimento);
        textoUsuario=findViewById(R.id.textoUsuario);
        textoContrasena=findViewById(R.id.textoContrasena);
        textViewRegistro=findViewById(R.id.textViewRegistro);
        builder = new AlertDialog.Builder(this);


        botonLogin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                loginTask = new LoginTask(textoUsuario.getText().toString(),textoContrasena.getText().toString());
                loginTask.setLoginTaskResponse(LoginActivity.this);
                loginTask.execute();
            }
        });

        textViewRegistro.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intentRegistro = new Intent(getApplicationContext(), RegistroActivity.class);
                startActivity(intentRegistro);
            }
        });

    }

    @Override
    public void LoginFinishOK(String token, String idCliente) {
        SharedPreferences sharedPref = this.getSharedPreferences("Prefs", Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = sharedPref.edit();
        editor.putString("token", token);
        editor.putString("idCliente",idCliente);
        editor.apply();
        Intent intentEstablecimientos = new Intent(this, EstablecimientosActivity.class);
        startActivity(intentEstablecimientos);
    }

    @Override
    public void LoginFinishERR() {

        builder.setMessage("Error de login")
                .setPositiveButton("OK", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {

                    }
                });
        AlertDialog alertDialog = builder.create();
        alertDialog.show();
        alertDialog.show();
    }
}
