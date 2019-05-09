package com.example.android;

import android.os.AsyncTask;

import com.example.android.Auxiliar.Experiencia;
import com.example.android.Auxiliar.ResponderExperimentoTaskResponse;
import com.example.android.Remote.IRemote;

import java.io.IOException;

import okhttp3.OkHttpClient;
import okhttp3.logging.HttpLoggingInterceptor;
import retrofit2.Call;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class ResponderExperimentoTask extends AsyncTask<Void, Void, Void> {
    private Experiencia experiencia;

    private Response<Void> mResponse = null;
    private String token;
    private ResponderExperimentoTaskResponse responderExperimentoTaskResponse = null;

    public ResponderExperimentoTask(Experiencia experiencia, String token) {
        this.token=token;
        this.experiencia = experiencia;
    }


    @Override
    protected Void doInBackground(Void... voids) {

        HttpLoggingInterceptor logging = new HttpLoggingInterceptor();
        logging.setLevel(HttpLoggingInterceptor.Level.BODY);
        OkHttpClient.Builder httpClient = new OkHttpClient.Builder();
        httpClient.addInterceptor(logging);
        Retrofit retrofit = new Retrofit.Builder()
                .client(httpClient.build())
                .baseUrl(IRemote.BASE_ROUTE)
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        IRemote service = retrofit.create(IRemote.class);

        Call<Void> call = service.responderExperimento(experiencia, token);
        try {
            mResponse = call.execute();

        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    protected void onPostExecute(Void aVoid) {
        if (mResponse!=null && mResponse.code()==201)
            responderExperimentoTaskResponse.ResponderExperimentoFinishOK();
        else responderExperimentoTaskResponse.ResponderExperimentoFinishERR();
    }

    public ResponderExperimentoTaskResponse getResponderExperimentoTaskResponse() {
        return responderExperimentoTaskResponse;
    }

    public void setResponderExperimentoTaskResponse(ResponderExperimentoTaskResponse responderExperimentoTaskResponse) {
        this.responderExperimentoTaskResponse = responderExperimentoTaskResponse;
    }
}
