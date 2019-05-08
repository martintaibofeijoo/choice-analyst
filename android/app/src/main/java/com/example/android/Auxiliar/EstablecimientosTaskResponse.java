package com.example.android.Auxiliar;

import java.util.Collection;

public interface EstablecimientosTaskResponse {
    void EstablecimientosFinishOK(Collection<Establecimiento> establecimientos);
    void EstablecimientosFinishERR();
}