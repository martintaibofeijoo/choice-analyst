package com.example.android.Activities;

import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.util.Patterns;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.Spinner;

import com.example.android.Clases.Usuario;
import com.example.android.R;
import com.example.android.Tasks.LoginTask;
import com.example.android.Tasks.ModificarUsuarioTask;
import com.example.android.Tasks.ObtenerUsuarioTask;
import com.example.android.Tasks.RegistroTask;
import com.example.android.TasksResponse.LoginTaskResponse;
import com.example.android.TasksResponse.ModificarUsuarioTaskResponse;
import com.example.android.TasksResponse.ObtenerUsuarioTaskResponse;
import com.example.android.TasksResponse.RegistroTaskResponse;

import java.util.regex.Pattern;

public class ModificarUsuarioActivity extends AppCompatActivity implements LoginTaskResponse, ModificarUsuarioTaskResponse, ObtenerUsuarioTaskResponse {

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
    private String token;
    private String idCliente;


    private AlertDialog.Builder builder;
    private ModificarUsuarioTask modificarUsuarioTask;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_modificarusuario);
        botonRegistro = findViewById(R.id.botonFinalizarExperimento);
        textoUsuario = findViewById(R.id.textoUsuario);
        textoContrasena = findViewById(R.id.textoContrasena);
        textoCorreoElectronico = findViewById(R.id.textoCorreoElectronico);
        textoTelefonoContacto = findViewById(R.id.textoTelefonoContacto);
        textoNombre = findViewById(R.id.textoNombre);
        textoApellidos = findViewById(R.id.textoApellidos);
        textoFechaNacimiento = findViewById(R.id.textoFechaNacimiento);
        builder = new AlertDialog.Builder(this);
        spinnerSexo = findViewById(R.id.spinnerSexo);
        spinnerSexo.setPadding(0, 30, 0, 30);
        adapterSpinnerSexo = ArrayAdapter.createFromResource(this, R.array.sexo_array, android.R.layout.simple_spinner_item);
        adapterSpinnerSexo.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        spinnerSexo.setAdapter(adapterSpinnerSexo);
        spinnerOrigen = findViewById(R.id.spinnerOrigen);
        spinnerOrigen.setPadding(0, 30, 0, 30);
        adapterSpinnerOrigen = ArrayAdapter.createFromResource(this, R.array.origen_array, android.R.layout.simple_spinner_item);
        adapterSpinnerOrigen.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        spinnerOrigen.setAdapter(adapterSpinnerOrigen);
        spinnerNivelEstudios = findViewById(R.id.spinnerNivelEstudios);
        spinnerNivelEstudios.setPadding(0, 30, 0, 30);
        adapterSpinnerNivelEstudios = ArrayAdapter.createFromResource(this, R.array.nivelestudios_array, android.R.layout.simple_spinner_item);
        adapterSpinnerNivelEstudios.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        spinnerNivelEstudios.setAdapter(adapterSpinnerNivelEstudios);
        linearLayout = findViewById(R.id.experimentoLayout);


        SharedPreferences sharedPref = this.getSharedPreferences("Prefs", Context.MODE_PRIVATE);
        this.token = sharedPref.getString("token", null);
        this.idCliente = sharedPref.getString("idCliente", null);
        if (token != null && idCliente != null) {
            ObtenerUsuarioTask obtenerUsuarioTask = new ObtenerUsuarioTask(idCliente, token);
            obtenerUsuarioTask.setObtenerUsuarioTaskResponse(ModificarUsuarioActivity.this);
            obtenerUsuarioTask.execute();
        }


        botonRegistro.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (!textoUsuario.getText().toString().equals("") &&
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
                    if (validarCampos(textoUsuario.getText().toString(), textoContrasena.getText().toString(),
                            textoCorreoElectronico.getText().toString(), textoTelefonoContacto.getText().toString(), textoNombre.getText().toString(),
                            textoApellidos.getText().toString(), textoFechaNacimiento.getText().toString())) {
                        builder.setMessage("Desea modificar dicho usuario?")
                                .setNegativeButton("Cancelar", new DialogInterface.OnClickListener() {
                                    @Override
                                    public void onClick(DialogInterface dialog, int which) {

                                    }
                                })
                                .setPositiveButton("Modificar Usuario", new DialogInterface.OnClickListener() {
                                    @Override
                                    public void onClick(DialogInterface dialog, int which) {
                                        Usuario usuario = new Usuario(textoUsuario.getText().toString(), textoContrasena.getText().toString(),
                                                textoCorreoElectronico.getText().toString(), textoTelefonoContacto.getText().toString(), textoNombre.getText().toString(),
                                                textoApellidos.getText().toString(), textoFechaNacimiento.getText().toString(),
                                                spinnerSexo.getSelectedItem().toString(), spinnerOrigen.getSelectedItem().toString(), spinnerNivelEstudios.getSelectedItem().toString());
                                        modificarUsuarioTask = new ModificarUsuarioTask(usuario, token);
                                        modificarUsuarioTask.setModificarUsuarioTaskResponse(ModificarUsuarioActivity.this);
                                        modificarUsuarioTask.execute();
                                    }
                                });
                        AlertDialog alertDialog = builder.create();
                        alertDialog.show();

                    }
                } else {
                    builder.setMessage("Por favor, rellene todos los campos!")
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

    public boolean validarCampos(String textoUsuario, String textoContrasena, String textoCorreoElectronico, String textoTelefonoContacto, String textoNombre, String textoApellidos, String textoFechaNacimiento) {
        Pattern patronUsuario = Pattern.compile("[a-z][a-z0-9-_\\.]{4,20}");
        if (!patronUsuario.matcher(textoUsuario).matches()) {
            builder.setMessage("El usuario debe contener: 4-20 carácteres (sin mayúsculas).")
                    .setPositiveButton("OK", new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface dialog, int which) {

                        }
                    });
            AlertDialog alertDialog = builder.create();
            alertDialog.show();
            return false;
        }

        Pattern patronContrasena = Pattern.compile("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\\s).*");
        if (!patronContrasena.matcher(textoContrasena).matches()) {
            builder.setMessage("La contraseña debe contener: una mayúscula, una minúscula y un número.")
                    .setPositiveButton("OK", new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface dialog, int which) {

                        }
                    });
            AlertDialog alertDialog = builder.create();
            alertDialog.show();
            return false;
        }

        Pattern patronCorreoElectronico = Patterns.EMAIL_ADDRESS;
        if (!patronCorreoElectronico.matcher(textoCorreoElectronico).matches()) {
            builder.setMessage("El correo electrónico debe ser de la forma: example@example.dominio.")
                    .setPositiveButton("OK", new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface dialog, int which) {

                        }
                    });
            AlertDialog alertDialog = builder.create();
            alertDialog.show();
            return false;
        }

        Pattern patronTelefonoContacto = Pattern.compile("(\\+34|0034|34)?[6|7|8|9][0-9]{8}");
        if (!patronTelefonoContacto.matcher(textoTelefonoContacto).matches()) {
            builder.setMessage("El número de teléfono debe contener 8 dígitos y comenzar por 6,7,8 u 9.")
                    .setPositiveButton("OK", new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface dialog, int which) {

                        }
                    });
            AlertDialog alertDialog = builder.create();
            alertDialog.show();
            return false;
        }
        return true;
    }

    @Override
    public void LoginFinishOK(String token, String idCliente) {
        SharedPreferences sharedPref = this.getSharedPreferences("Prefs", Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = sharedPref.edit();
        editor.putString("token", token);
        editor.putString("idCliente", idCliente);
        editor.apply();
    }

    @Override
    public void LoginFinishERR() {

        builder.setMessage("Error de Registro!")
                .setPositiveButton("OK", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {

                    }
                });
        AlertDialog alertDialog = builder.create();
        alertDialog.show();
    }


    @Override
    public void ModificarUsuarioFinishOK() {
        LoginTask loginTask = new LoginTask(textoUsuario.getText().toString(), textoContrasena.getText().toString());
        loginTask.setLoginTaskResponse(ModificarUsuarioActivity.this);
        loginTask.execute();
        SharedPreferences sharedPref = this.getSharedPreferences("Prefs", Context.MODE_PRIVATE);
        this.token = sharedPref.getString("token", null);
        this.idCliente = sharedPref.getString("idCliente", null);

        builder.setMessage("Usuario Modificado Correctamente!")
                .setPositiveButton("OK", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        if (token != null && idCliente != null) {
                            ObtenerUsuarioTask obtenerUsuarioTask = new ObtenerUsuarioTask(idCliente, token);
                            obtenerUsuarioTask.setObtenerUsuarioTaskResponse(ModificarUsuarioActivity.this);
                            obtenerUsuarioTask.execute();
                        }
                    }
                });
        AlertDialog alertDialog = builder.create();
        alertDialog.show();

    }

    @Override
    public void ModificarUsuarioFinishERR() {
        builder.setMessage("Error modificando usuario, no puede haber dos usuarios con el mismo username!")
                .setPositiveButton("OK", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {

                    }
                });
        AlertDialog alertDialog = builder.create();
        alertDialog.show();
    }

    @Override
    public void ObtenerUsuarioFinishOK(Usuario usuario) {

        this.textoUsuario.setText(usuario.getUsername());
        this.textoCorreoElectronico.setText(usuario.getCorreoElectronico());
        this.textoTelefonoContacto.setText(usuario.getTelefonoContacto());
        this.textoNombre.setText(usuario.getNombre());
        this.textoApellidos.setText(usuario.getApellidos());
        this.textoFechaNacimiento.setText(usuario.getFechaNacimiento());
        if(usuario.getOrigen()!=null){

        }
        if(usuario.getSexo()!=null){

        }
        if(usuario.getNivelEstudios()!=null){

        }

    }

    @Override
    public void ObtenerUsuarioFinishERR() {
        builder.setMessage("Error obteniendo el usuario!")
                .setPositiveButton("OK", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {

                    }
                });
        AlertDialog alertDialog = builder.create();
        alertDialog.show();
    }
}
