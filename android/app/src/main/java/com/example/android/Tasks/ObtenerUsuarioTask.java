package com.example.android.Tasks;

import android.os.AsyncTask;

import com.example.android.Clases.Usuario;
import com.example.android.Servicios.IServicios;
import com.example.android.TasksResponse.ObtenerUsuarioTaskResponse;

import java.io.IOException;

import okhttp3.OkHttpClient;
import okhttp3.logging.HttpLoggingInterceptor;
import retrofit2.Call;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class ObtenerUsuarioTask extends AsyncTask<Void, Void, Void> {
    private String token;
    private String idUsuario;
    private Response<Usuario> mResponse = null;
    private ObtenerUsuarioTaskResponse obtenerUsuarioTaskResponse = null;

    public ObtenerUsuarioTask(String idUsuario, String token) {
        this.token = token;
        this.idUsuario = idUsuario;
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

        Call<Usuario> call = service.obtenerUsuario(this.idUsuario, token);
        try {
            mResponse = call.execute();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    protected void onPostExecute(Void aVoid) {
        if (mResponse != null && mResponse.code() == 200) {
            obtenerUsuarioTaskResponse.ObtenerUsuarioFinishOK(mResponse.body());
        } else obtenerUsuarioTaskResponse.ObtenerUsuarioFinishERR();
    }

    public ObtenerUsuarioTaskResponse getObtenerUsuarioTaskResponse() {
        return obtenerUsuarioTaskResponse;
    }

    public void setObtenerUsuarioTaskResponse(ObtenerUsuarioTaskResponse obtenerUsuarioTaskResponse) {
        this.obtenerUsuarioTaskResponse = obtenerUsuarioTaskResponse;
    }
}
