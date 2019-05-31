package com.example.android.Activities;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.Spinner;
import android.widget.TextView;

import com.example.android.Clases.Establecimiento;
import com.example.android.Clases.Experiencia;
import com.example.android.Clases.Experimento;
import com.example.android.R;
import com.example.android.Tasks.ObtenerExperimentoTask;
import com.example.android.Tasks.ResponderExperimentoTask;
import com.example.android.TasksResponse.ObtenerExperimentoTaskResponse;
import com.example.android.TasksResponse.ResponderExperimentoTaskResponse;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ExperimentoActivity extends AppCompatActivity implements ObtenerExperimentoTaskResponse, ResponderExperimentoTaskResponse {

    private Button botonFinalizarExperimento;
    private Experimento experimento;
    private Establecimiento establecimiento;
    private HashMap<String, Spinner> spinners;
    private LinearLayout experimentoLayout;
    private String token;
    private String idCliente;
    private Experiencia experiencia;
    private ResponderExperimentoTask responderExperimentoTask;
    private ArrayList<ArrayAdapter<CharSequence>> adapter;

    private AlertDialog.Builder builder;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_experimento);

        botonFinalizarExperimento = findViewById(R.id.botonFinalizarExperimento);
        experimentoLayout = findViewById(R.id.experimentoLayout);
        spinners = new HashMap<String, Spinner>();
        builder = new AlertDialog.Builder(this);

        botonFinalizarExperimento.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                experiencia = new Experiencia();
                experiencia.setIdCliente(idCliente);
                String pattern = "dd-MM-yyyy";
                SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
                String fechaActual = simpleDateFormat.format(new Date());
                experiencia.setFechaRealizacion(fechaActual);
                experiencia.setIdExperimento(experimento.getIdExperimento());
                experiencia.setIdEstablecimiento(establecimiento.getIdEstablecimiento());
                for (Map.Entry<String, Spinner> spinner : spinners.entrySet()) {
                    if (spinner.getKey().equals("Higiene")) {
                        experiencia.setHigiene(spinner.getValue().getSelectedItem().toString());
                    } else if (spinner.getKey().equals("Ruído")) {
                        experiencia.setRuido(spinner.getValue().getSelectedItem().toString());
                    } else if (spinner.getKey().equals("Distancía")) {
                        experiencia.setDistancia(spinner.getValue().getSelectedItem().toString());
                    } else if (spinner.getKey().equals("Energía")) {
                        experiencia.setEnergia(spinner.getValue().getSelectedItem().toString());
                    } else if (spinner.getKey().equals("Compañía")) {
                        experiencia.setCompania(spinner.getValue().getSelectedItem().toString());
                    } else if (spinner.getKey().equals("Atmósfera")) {
                        experiencia.setAtmosfera(spinner.getValue().getSelectedItem().toString());
                    } else if (spinner.getKey().equals("Calidad de Servicio")) {
                        experiencia.setCalidadServicio(spinner.getValue().getSelectedItem().toString());
                    } else if (spinner.getKey().equals("Apariencia")) {
                        experiencia.setApariencia(spinner.getValue().getSelectedItem().toString());
                    } else if (spinner.getKey().equals("Temperatura")) {
                        experiencia.setTemperatura(spinner.getValue().getSelectedItem().toString());
                    } else if (spinner.getKey().equals("Saludable")) {
                        experiencia.setSaludable(spinner.getValue().getSelectedItem().toString());
                    } else if (spinner.getKey().equals("Sabroso")) {
                        experiencia.setSabroso(spinner.getValue().getSelectedItem().toString());
                    } else if (spinner.getKey().equals("Menú Seleccionado")) {
                        experiencia.setMenuSeleccionado(spinner.getValue().getSelectedItem().toString());
                    } else if (spinner.getKey().equals("Primer Plato")) {
                        experiencia.setPrimerPlato(spinner.getValue().getSelectedItem().toString());
                    } else if (spinner.getKey().equals("Segundo Plato")) {
                        experiencia.setSegundoPlato(spinner.getValue().getSelectedItem().toString());
                    } else if (spinner.getKey().equals("Postre")) {
                        experiencia.setPostre(spinner.getValue().getSelectedItem().toString());
                    }
                }

                responderExperimentoTask = new ResponderExperimentoTask(experiencia,token);
                responderExperimentoTask.setResponderExperimentoTaskResponse(ExperimentoActivity.this);
                responderExperimentoTask.execute();
            }
        });

        this.establecimiento = (Establecimiento) getIntent().getSerializableExtra("establecimiento");
        SharedPreferences sharedPref = this.getSharedPreferences("Prefs", Context.MODE_PRIVATE);
        this.token = sharedPref.getString("token", null);
        this.idCliente = sharedPref.getString("idCliente", null);
        if (token != null && idCliente != null) {
            ObtenerExperimentoTask obtenerExperimentoTask = new ObtenerExperimentoTask(establecimiento.getIdEstablecimiento(), token);
            obtenerExperimentoTask.setObtenerExperimentoTaskResponse(ExperimentoActivity.this);
            obtenerExperimentoTask.execute();
        }

    }

    @Override
    public void ObtenerExperimentoFinishOK(Experimento experimento) {
        this.experimento = experimento;
        for (int i = 0; i < this.experimento.getPreguntas().size(); i++) {

            if (!experimento.getPreguntas().get(i).getVariableAsociada().equals("Primer Plato") && !experimento.getPreguntas().get(i).getVariableAsociada().equals("Segundo Plato") && !experimento.getPreguntas().get(i).getVariableAsociada().equals("Postre")) {
                TextView textView = new TextView(this);
                textView.setText(experimento.getPreguntas().get(i).getTextoPregunta());
                textView.setPadding(40, 30, 20, 0);
                experimentoLayout.addView(textView);
                List<String> opciones = new ArrayList<String>();
                opciones.add("Seleccione una Opción");
                if (!experimento.getPreguntas().get(i).getVariableAsociada().equals("Menú Seleccionado")) {
                    for (int j = 0; j < experimento.getPreguntas().get(i).getOpciones().size(); j++) {
                        opciones.add(experimento.getPreguntas().get(i).getOpciones().get(j).getTextoOpcion());
                    }
                } else {
                    for (int j = 0; j < establecimiento.getMenus().size(); j++) {
                        opciones.add(establecimiento.getMenus().get(j).getNombreMenu());
                    }
                }
                Spinner spinner = new Spinner(this);
                ArrayAdapter<String> dataAdapter = new ArrayAdapter<String>(this, android.R.layout.simple_spinner_item, opciones);
                dataAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
                spinner.setAdapter(dataAdapter);
                spinner.setPadding(40, 0, 20, 0);
                spinners.put(experimento.getPreguntas().get(i).getVariableAsociada(), spinner);
                experimentoLayout.addView(spinner);
            }

        }

    }

    @Override
    public void ObtenerExperimentoFinishERR() {

    }

    @Override
    public void ResponderExperimentoFinishOK() {
        SharedPreferences sharedPref = this.getSharedPreferences("Prefs", Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = sharedPref.edit();
        editor.clear();
        Intent intentFinalizar = new Intent(this, FinalizarActivity.class);
        startActivity(intentFinalizar);
    }

    @Override
    public void ResponderExperimentoFinishERR() {

    }
}
