package com.example.android;

import android.content.Context;
import android.content.SharedPreferences;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;

import com.example.android.Auxiliar.Establecimiento;
import com.example.android.Auxiliar.EstablecimientosTaskResponse;
import com.example.android.Auxiliar.MyAdapter;

import java.util.ArrayList;
import java.util.Collection;

public class EstablecimientosActivity extends AppCompatActivity implements EstablecimientosTaskResponse {

    private RecyclerView recyclerViewRestaurantes;
    private MyAdapter adapter;
    private RecyclerView.LayoutManager layoutManager;
    private ArrayList<Establecimiento> listadoEstablecimientos = new ArrayList<>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_establecimientos);

        recyclerViewRestaurantes = findViewById(R.id.recyclerViewRestaurantes);
        layoutManager = new LinearLayoutManager(this);
        recyclerViewRestaurantes.setLayoutManager(layoutManager);
        adapter = new MyAdapter(listadoEstablecimientos);
        recyclerViewRestaurantes.setAdapter(adapter);

        SharedPreferences sharedPref = this.getSharedPreferences("Prefs", Context.MODE_PRIVATE);
        String token= sharedPref.getString("token",null);
        if(token!=null){
            EstablecimientosTask establecimientosTask = new EstablecimientosTask("",token);
            establecimientosTask.setEstablecimientosTaskResponse(EstablecimientosActivity.this);
            establecimientosTask.execute();
        }

    }


    @Override
    public void EstablecimientosFinishOK(Collection<Establecimiento> establecimientos) {
        listadoEstablecimientos= (ArrayList<Establecimiento>) establecimientos;
        adapter.setListadoEstablecimientos(listadoEstablecimientos);
        adapter.notifyDataSetChanged();
    }

    @Override
    public void EstablecimientosFinishERR() {

    }
}
