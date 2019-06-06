package com.example.android.Activities;

import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.AdapterView;
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
    private HashMap<String, TextView> textsViews;
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
        textsViews = new HashMap<>();
        builder = new AlertDialog.Builder(this);

        botonFinalizarExperimento.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                builder.setMessage("¿Desea finalizar el experimento?")
                        .setNegativeButton("Cancelar",new DialogInterface.OnClickListener(){
                            @Override
                            public void onClick(DialogInterface dialog, int which) {

                            }
                        })
                        .setPositiveButton("Finalizar", new DialogInterface.OnClickListener() {
                            @Override
                            public void onClick(DialogInterface dialog, int which) {
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

                                responderExperimentoTask = new ResponderExperimentoTask(experiencia, token);
                                responderExperimentoTask.setResponderExperimentoTaskResponse(ExperimentoActivity.this);
                                responderExperimentoTask.execute();
                            }
                        });
                AlertDialog alertDialog = builder.create();
                alertDialog.show();


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
            TextView textView = new TextView(this);
            textView.setText(experimento.getPreguntas().get(i).getTextoPregunta());
            textView.setPadding(40, 30, 20, 0);
            experimentoLayout.addView(textView);
            textsViews.put(experimento.getPreguntas().get(i).getVariableAsociada(), textView);
            List<String> opciones = new ArrayList<String>();
            if (!experimento.getPreguntas().get(i).getVariableAsociada().equals("Menú Seleccionado")) {
                for (int j = 0; j < experimento.getPreguntas().get(i).getOpciones().size(); j++) {
                    opciones.add(experimento.getPreguntas().get(i).getOpciones().get(j).getTextoOpcion());
                }
            } else {
                String pattern = "dd-MM-yyyy";
                SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
                String fechaActual = simpleDateFormat.format(new Date());
                for (int j = 0; j < establecimiento.getMenus().size(); j++) {
                    if (establecimiento.getMenus().get(j).getFechasMenu().contains(fechaActual)) {
                        opciones.add(establecimiento.getMenus().get(j).getNombreMenu());
                    }
                }

            }
            final Spinner spinner = new Spinner(this);
            if (experimento.getPreguntas().get(i).getVariableAsociada().equals("Menú Seleccionado")) {
                spinner.setOnItemSelectedListener(
                        new AdapterView.OnItemSelectedListener() {
                            @Override
                            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                                String valorSpinner = (String) spinner.getItemAtPosition(position);
                                for (Map.Entry<String, Spinner> entry : spinners.entrySet()) {
                                    if (entry.getKey().equals("Primer Plato") || entry.getKey().equals("Segundo Plato") || entry.getKey().equals("Postre")) {
                                        List<String> opciones = new ArrayList<String>();

                                        for (int i = 0; i < establecimiento.getMenus().size(); i++) {
                                            if (establecimiento.getMenus().get(i).getNombreMenu().equals(valorSpinner)) {
                                                for (int j = 0; j < establecimiento.getMenus().get(i).getPlatos().size(); j++) {
                                                    if (establecimiento.getMenus().get(i).getPlatos().get(j).getTipoPlato().equals("PrimerPlato") && entry.getKey().equals("Primer Plato")) {
                                                        opciones.add(establecimiento.getMenus().get(i).getPlatos().get(j).getNombrePlato());
                                                    }
                                                    if (establecimiento.getMenus().get(i).getPlatos().get(j).getTipoPlato().equals("SegundoPlato") && entry.getKey().equals("Segundo Plato")) {
                                                        opciones.add(establecimiento.getMenus().get(i).getPlatos().get(j).getNombrePlato());
                                                    }
                                                    if (establecimiento.getMenus().get(i).getPlatos().get(j).getTipoPlato().equals("Postre") && entry.getKey().equals("Postre")) {
                                                        opciones.add(establecimiento.getMenus().get(i).getPlatos().get(j).getNombrePlato());
                                                    }
                                                }
                                            }
                                            ArrayAdapter<String> dataAdapter = new ArrayAdapter<String>(parent.getContext(), android.R.layout.simple_spinner_item, opciones);
                                            dataAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
                                            entry.getValue().setAdapter(dataAdapter);
                                        }
                                    }
                                }
                            }

                            @Override
                            public void onNothingSelected(AdapterView<?> parent) {

                            }
                        }
                );
            }
            ArrayAdapter<String> dataAdapter = new ArrayAdapter<String>(this, android.R.layout.simple_spinner_item, opciones);
            dataAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
            spinner.setAdapter(dataAdapter);

            spinner.setPadding(40, 0, 20, 0);
            if (experimento.getPreguntas().get(i).getVariableAsociada().equals("Postre")) {
                spinner.setPadding(40, 0, 20, 50);
            }
            spinners.put(experimento.getPreguntas().get(i).getVariableAsociada(), spinner);
            experimentoLayout.addView(spinner);

        }
    }


    @Override
    public void ObtenerExperimentoFinishERR() {
        botonFinalizarExperimento.setVisibility(View.INVISIBLE);
        builder.setMessage("No existe ningún experimento asociado a este establecimiento!")
                .setPositiveButton("OK", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        onBackPressed();
                    }
                });
        AlertDialog alertDialog = builder.create();
        alertDialog.show();
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
        builder.setMessage("Error respondiendo al experimento!")
                .setPositiveButton("OK", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        onBackPressed();
                    }
                });
        AlertDialog alertDialog = builder.create();
        alertDialog.show();
    }
}
