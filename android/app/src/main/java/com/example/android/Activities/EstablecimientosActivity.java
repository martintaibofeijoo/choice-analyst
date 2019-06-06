package com.example.android.Activities;

import android.content.Context;
import android.content.DialogInterface;
import android.content.SharedPreferences;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.text.Editable;
import android.text.TextWatcher;
import android.widget.EditText;

import com.example.android.Clases.Establecimiento;
import com.example.android.R;
import com.example.android.Tasks.EstablecimientosTask;
import com.example.android.TasksResponse.EstablecimientosTaskResponse;
import com.example.android.Clases.EstablecimientosAdapter;

import java.util.ArrayList;
import java.util.Collection;

public class EstablecimientosActivity extends AppCompatActivity implements EstablecimientosTaskResponse {

    private RecyclerView recyclerViewRestaurantes;
    private EstablecimientosAdapter adapter;
    private RecyclerView.LayoutManager layoutManager;
    private ArrayList<Establecimiento> listadoEstablecimientos = new ArrayList<>();
    private EditText textoBusqueda;
    private String token;
    private AlertDialog.Builder builder;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_establecimientos);
        builder = new AlertDialog.Builder(this);
        recyclerViewRestaurantes = findViewById(R.id.recyclerViewRestaurantes);
        layoutManager = new LinearLayoutManager(this);
        recyclerViewRestaurantes.setLayoutManager(layoutManager);
        adapter = new EstablecimientosAdapter(listadoEstablecimientos);
        recyclerViewRestaurantes.setAdapter(adapter);
        textoBusqueda = findViewById(R.id.editTextBusqueda);
        textoBusqueda.addTextChangedListener(new TextWatcher() {

            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {

            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {
            }

            public void afterTextChanged(Editable s) {
                EstablecimientosTask establecimientosTask = new EstablecimientosTask(s.toString(), token);
                establecimientosTask.setEstablecimientosTaskResponse(EstablecimientosActivity.this);
                establecimientosTask.execute();
            }
        });

        SharedPreferences sharedPref = this.getSharedPreferences("Prefs", Context.MODE_PRIVATE);
        this.token = sharedPref.getString("token", null);
        if (this.token != null) {
            EstablecimientosTask establecimientosTask = new EstablecimientosTask("", this.token);
            establecimientosTask.setEstablecimientosTaskResponse(EstablecimientosActivity.this);
            establecimientosTask.execute();
        }

    }


    @Override
    public void EstablecimientosFinishOK(Collection<Establecimiento> establecimientos) {
        listadoEstablecimientos = (ArrayList<Establecimiento>) establecimientos;
        adapter.setListadoEstablecimientos(listadoEstablecimientos);
        adapter.notifyDataSetChanged();
        if (establecimientos.size() == 0) {
            builder.setMessage("No existen establecimientos con este nombre!")
                    .setPositiveButton("OK", new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface dialog, int which) {

                        }
                    });
            AlertDialog alertDialog = builder.create();
            alertDialog.show();
        }
    }

    @Override
    public void EstablecimientosFinishERR() {
        builder.setMessage("Error buscando establecimientos!")
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
