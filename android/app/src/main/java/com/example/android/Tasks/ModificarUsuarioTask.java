package com.example.android.Tasks;

import android.os.AsyncTask;

import com.example.android.Clases.Usuario;
import com.example.android.Servicios.IServicios;
import com.example.android.TasksResponse.ModificarUsuarioTaskResponse;

import java.io.IOException;

import okhttp3.OkHttpClient;
import okhttp3.logging.HttpLoggingInterceptor;
import retrofit2.Call;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class ModificarUsuarioTask extends AsyncTask<Void, Void, Void> {
    private Usuario usuario;
    private String idCliente;

    private Response<Void> mResponse = null;
    private String token;
    private ModificarUsuarioTaskResponse modificarUsuarioTaskResponse = null;

    public ModificarUsuarioTask(Usuario usuario, String token, String idCliente) {
        this.usuario = usuario;
        this.token=token;
        this.idCliente = idCliente;
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

        Call<Void> call = service.modificarUsuario(this.idCliente, this.token, this.usuario);
        try {
            mResponse = call.execute();

        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    protected void onPostExecute(Void aVoid) {
        if (mResponse != null && mResponse.code() == 200)
            modificarUsuarioTaskResponse.ModificarUsuarioFinishOK();
        else modificarUsuarioTaskResponse.ModificarUsuarioFinishERR();
    }

    public ModificarUsuarioTaskResponse getModificarUsuarioTaskResponse() {
        return modificarUsuarioTaskResponse;
    }

    public void setModificarUsuarioTaskResponse(ModificarUsuarioTaskResponse modificarUsuarioTaskResponse) {
        this.modificarUsuarioTaskResponse = modificarUsuarioTaskResponse;
    }
}
