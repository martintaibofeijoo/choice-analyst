package com.example.android.Tasks;

import android.os.AsyncTask;

import com.example.android.Clases.Experimento;
import com.example.android.TasksResponse.ObtenerExperimentoTaskResponse;
import com.example.android.Servicios.IServicios;

import java.io.IOException;

import okhttp3.OkHttpClient;
import okhttp3.logging.HttpLoggingInterceptor;
import retrofit2.Call;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class ObtenerExperimentoTask extends AsyncTask<Void, Void, Void> {
    private String token;
    private String idEstablecimiento;
    private Response<Experimento> mResponse = null;
    private ObtenerExperimentoTaskResponse obtenerExperimentoTaskResponse = null;

    public ObtenerExperimentoTask(String idEstablecimiento, String token) {
        this.token = token;
        this.idEstablecimiento=idEstablecimiento;
    }

    @Override
    protected Void doInBackground(Void... voids) {

        HttpLoggingInterceptor logging = new HttpLoggingInterceptor();
        logging.setLevel(HttpLoggingInterceptor.Level.BODY);
        OkHttpClient.Builder httpClient = new OkHttpClient.Builder();
        httpClient.addInterceptor(logging);
        Retrofit retrofit = new Retrofit.Builder()
                .client(httpClient.build())
                .baseUrl(IServicios.BASE_ROUTE)
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        IServicios service = retrofit.create(IServicios.class);

        Call<Experimento> call = service.obtenerExperimento(this.idEstablecimiento, token);
        try {
            mResponse = call.execute();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    protected void onPostExecute(Void aVoid) {
        if (mResponse!=null && mResponse.code()==200) {
            obtenerExperimentoTaskResponse.ObtenerExperimentoFinishOK(mResponse.body());
        }
        else obtenerExperimentoTaskResponse.ObtenerExperimentoFinishERR();
    }

    public ObtenerExperimentoTaskResponse getObtenerExperimentoTaskResponse() {
        return obtenerExperimentoTaskResponse;
    }

    public void setObtenerExperimentoTaskResponse(ObtenerExperimentoTaskResponse obtenerExperimentoTaskResponse) {
        this.obtenerExperimentoTaskResponse = obtenerExperimentoTaskResponse;
    }
}
