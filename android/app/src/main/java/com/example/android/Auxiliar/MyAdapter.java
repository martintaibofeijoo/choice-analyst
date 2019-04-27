package com.example.android.Auxiliar;

import android.support.annotation.NonNull;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.example.android.R;

import java.util.ArrayList;
import java.util.List;

public class MyAdapter extends RecyclerView.Adapter<MyAdapter.MyViewHolder> {
    private ArrayList<Establecimiento> listadoEstablecimientos;

    public MyAdapter(ArrayList<Establecimiento> establecimientos){
        listadoEstablecimientos = establecimientos;
    }

    public static class MyViewHolder extends RecyclerView.ViewHolder {
        // each data item is just a string in this case
        public TextView textViewNombreEstablecimiento;
        public TextView textViewLocalizacionEstablecimiento;

        public MyViewHolder(View v) {
            super(v);
            textViewNombreEstablecimiento = v.findViewById(R.id.textViewNombreEstablecimiento);
            textViewLocalizacionEstablecimiento = v.findViewById(R.id.textViewLocalizacionEstablecimiento);
        }
    }


    @NonNull
    @Override
    public MyViewHolder onCreateViewHolder(@NonNull ViewGroup viewGroup, int i) {
        View view = LayoutInflater.from(viewGroup.getContext())
                .inflate(R.layout.view_holder_establecimiento, viewGroup, false);

        return new MyViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull MyViewHolder viewHolder, int i) {
        Establecimiento establecimiento = listadoEstablecimientos.get(i);
        viewHolder.textViewLocalizacionEstablecimiento.setText(establecimiento.getLocalizacionEstablecimiento());
        viewHolder.textViewNombreEstablecimiento.setText(establecimiento.getNombreEstablecimiento());
    }

    @Override
    public int getItemCount() {
        return listadoEstablecimientos.size();
    }
}
