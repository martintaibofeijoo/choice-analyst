package com.example.android.Activities;

import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.Spinner;

import com.example.android.R;
import com.example.android.Tasks.LoginTask;
import com.example.android.Tasks.RegistroTask;
import com.example.android.TasksResponse.LoginTaskResponse;
import com.example.android.TasksResponse.RegistroTaskResponse;
import com.example.android.Clases.Usuario;

import java.util.regex.Pattern;

public class RegistroActivity extends AppCompatActivity implements LoginTaskResponse, RegistroTaskResponse {

    private Button botonRegistro;
    private EditText textoUsuario;
    private EditText textoContrasena;
    private EditText textoCorreoElectronico;
    private EditText textoTelefonoContacto;
    private EditText textoNombre;
    private EditText textoApellidos;
    private EditText textoFechaNacimiento;
    private Spinner spinnerSexo;
    private Spinner spinnerOrigen;
    private Spinner spinnerNivelEstudios;
    private LinearLayout linearLayout;
    ArrayAdapter<CharSequence> adapterSpinnerSexo;
    ArrayAdapter<CharSequence> adapterSpinnerOrigen;
    ArrayAdapter<CharSequence> adapterSpinnerNivelEstudios;

    private AlertDialog.Builder builder;
    private RegistroTask registroTask;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_registro);
        botonRegistro=findViewById(R.id.botonFinalizarExperimento);
        textoUsuario=findViewById(R.id.textoUsuario);
        textoContrasena=findViewById(R.id.textoContrasena);
        textoCorreoElectronico=findViewById(R.id.textoCorreoElectronico);
        textoTelefonoContacto=findViewById(R.id.textoTelefonoContacto);
        textoNombre=findViewById(R.id.textoNombre);
        textoApellidos=findViewById(R.id.textoApellidos);
        textoFechaNacimiento=findViewById(R.id.textoFechaNacimiento);
        builder = new AlertDialog.Builder(this);
        spinnerSexo=findViewById(R.id.spinnerSexo);
        spinnerSexo.setPadding(0,30,0,30);
        adapterSpinnerSexo = ArrayAdapter.createFromResource(this, R.array.sexo_array, android.R.layout.simple_spinner_item);
        adapterSpinnerSexo.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        spinnerSexo.setAdapter(adapterSpinnerSexo);
        spinnerOrigen=findViewById(R.id.spinnerOrigen);
        spinnerOrigen.setPadding(0,30,0,30);
        adapterSpinnerOrigen = ArrayAdapter.createFromResource(this, R.array.origen_array, android.R.layout.simple_spinner_item);
        adapterSpinnerOrigen.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        spinnerOrigen.setAdapter(adapterSpinnerOrigen);
        spinnerNivelEstudios=findViewById(R.id.spinnerNivelEstudios);
        spinnerNivelEstudios.setPadding(0,30,0,30);
        adapterSpinnerNivelEstudios = ArrayAdapter.createFromResource(this, R.array.nivelestudios_array, android.R.layout.simple_spinner_item);
        adapterSpinnerNivelEstudios.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        spinnerNivelEstudios.setAdapter(adapterSpinnerNivelEstudios);
        linearLayout = findViewById(R.id.experimentoLayout);

        botonRegistro.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                System.out.println("texto:"+textoUsuario.getText().toString());
                if(!textoUsuario.getText().toString().equals("") &&
                        !textoContrasena.getText().toString().equals("") &&
                        !textoCorreoElectronico.getText().toString().equals("") &&
                        !textoTelefonoContacto.getText().toString().equals("") &&
                        !textoNombre.getText().toString().equals("") &&
                        !textoApellidos.getText().toString().equals("") &&
                        !textoFechaNacimiento.getText().toString().equals("") &&
                        !spinnerSexo.getSelectedItem().toString().equals("") &&
                        !spinnerOrigen.getSelectedItem().toString().equals("") &&
                        !spinnerNivelEstudios.getSelectedItem().toString().equals("")
                ) {

                    Usuario usuario = new Usuario(textoUsuario.getText().toString(), textoContrasena.getText().toString(),
                            textoCorreoElectronico.getText().toString(), textoTelefonoContacto.getText().toString(), textoNombre.getText().toString(),
                            textoApellidos.getText().toString(), textoFechaNacimiento.getText().toString(),
                            spinnerSexo.getSelectedItem().toString(), spinnerOrigen.getSelectedItem().toString(), spinnerNivelEstudios.getSelectedItem().toString());
                    registroTask = new RegistroTask(usuario);
                    registroTask.setLoginTaskResponse(RegistroActivity.this);
                    registroTask.execute();
                }else{
                    builder.setMessage("Por favor, rellene todos los campos.")
                            .setPositiveButton("OK", new DialogInterface.OnClickListener() {
                                @Override
                                public void onClick(DialogInterface dialog, int which) {

                                }
                            });
                    AlertDialog alertDialog = builder.create();
                    alertDialog.show();
                }
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

        builder.setMessage("Error de Registro")
                .setPositiveButton("OK", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {

                    }
                });
        AlertDialog alertDialog = builder.create();
        alertDialog.show();
        alertDialog.show();
    }



    @Override
    public void RegistroFinishOK() {
        LoginTask loginTask = new LoginTask(textoUsuario.getText().toString(),textoContrasena.getText().toString());
        loginTask.setLoginTaskResponse(RegistroActivity.this);
        loginTask.execute();
    }

    @Override
    public void RegistroFinishERR() {
        builder.setMessage("Error creando usuario, no puede haber dos usuarios con el mismo username!")
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
