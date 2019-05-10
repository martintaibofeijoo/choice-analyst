package com.example.android.TasksResponse;

import com.example.android.Clases.Experimento;

public interface ObtenerExperimentoTaskResponse {
    void ObtenerExperimentoFinishOK(Experimento experimento);
    void ObtenerExperimentoFinishERR();
}