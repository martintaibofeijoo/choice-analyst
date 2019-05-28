package com.example.android.Activities;

import android.content.Context;
import android.content.SharedPreferences;
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

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_establecimientos);

        recyclerViewRestaurantes = findViewById(R.id.recyclerViewRestaurantes);
        layoutManager = new LinearLayoutManager(this);
        recyclerViewRestaurantes.setLayoutManager(layoutManager);
        adapter = new EstablecimientosAdapter(listadoEstablecimientos);
        recyclerViewRestaurantes.setAdapter(adapter);
        textoBusqueda = findViewById(R.id.editTextBusqueda);
        textoBusqueda.addTextChangedListener(new TextWatcher() {

            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {
                System.out.println("hOLA");

            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {
                System.out.println("hOLA");
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
    }

    @Override
    public void EstablecimientosFinishERR() {

    }
}
