package com.example.android.TasksResponse;

import com.example.android.Clases.Establecimiento;

import java.util.Collection;

public interface EstablecimientosTaskResponse {
    void EstablecimientosFinishOK(Collection<Establecimiento> establecimientos);
    void EstablecimientosFinishERR();
}