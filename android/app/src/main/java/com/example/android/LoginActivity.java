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

import com.example.android.Auxiliar.AsyncResponse;

public class LoginActivity extends AppCompatActivity implements AsyncResponse {

    private Button botonLogin;
    private EditText textoUsuario;
    private EditText textoContrasena;
    private AlertDialog.Builder builder;
    private LoginTask loginTask;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        botonLogin=findViewById(R.id.botonRegistro);
        textoUsuario=findViewById(R.id.textoUsuario);
        textoContrasena=findViewById(R.id.textoContrasena);
        builder = new AlertDialog.Builder(this);


        botonLogin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                loginTask = new LoginTask(textoUsuario.getText().toString(),textoContrasena.getText().toString());
                loginTask.setAsyncResponse(LoginActivity.this);
                loginTask.execute();
            }
        });

    }

    @Override
    public void processFinishOK(String token) {
        SharedPreferences sharedPref = this.getPreferences(Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = sharedPref.edit();
        editor.putString("token", token);
        editor.apply();
        Intent intentMain = new Intent(this, MainActivity.class);
        startActivity(intentMain);
    }

    @Override
    public void processFinishERR() {

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
