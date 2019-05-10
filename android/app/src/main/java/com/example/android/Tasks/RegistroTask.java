package com.example.android.Tasks;

import android.os.AsyncTask;

import com.example.android.TasksResponse.RegistroTaskResponse;
import com.example.android.Clases.Usuario;
import com.example.android.Servicios.IServicios;

import java.io.IOException;

import okhttp3.OkHttpClient;
import okhttp3.logging.HttpLoggingInterceptor;
import retrofit2.Call;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class RegistroTask extends AsyncTask<Void, Void, Void> {
    private Usuario usuario;

    private Response<Void> mResponse = null;
    private String token;
    private RegistroTaskResponse registroTaskResponse = null;

    public RegistroTask(Usuario usuario) {
        this.usuario = usuario;
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

        Call<Void> call = service.registro(usuario);
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
            registroTaskResponse.RegistroFinishOK();
        else registroTaskResponse.RegistroFinishERR();
    }

    public RegistroTaskResponse getRegistroTaskResponse() {
        return registroTaskResponse;
    }

    public void setLoginTaskResponse(RegistroTaskResponse registroTaskResponse) {
        this.registroTaskResponse = registroTaskResponse;
    }
}
