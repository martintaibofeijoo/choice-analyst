package com.example.android;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;

import com.example.android.Auxiliar.Establecimiento;
import com.example.android.Auxiliar.MyAdapter;

import java.util.ArrayList;

public class EstablecimientosActivity extends AppCompatActivity {

    private RecyclerView recyclerViewRestaurantes;
    private MyAdapter adapter;
    private RecyclerView.LayoutManager layoutManager;
    private ArrayList<Establecimiento> listadoEstablecimientos = null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_establecimientos);

        recyclerViewRestaurantes = findViewById(R.id.recyclerViewRestaurantes);
        layoutManager = new LinearLayoutManager(this);
        recyclerViewRestaurantes.setLayoutManager(layoutManager);
        adapter = new MyAdapter(listadoEstablecimientos);

        //NO POST EXECUTE: adapter.notifyDataSetChanged();

    }
}
