package com.example.android;

import android.os.AsyncTask;
import android.util.Log;

import com.example.android.Auxiliar.AsyncResponse;
import com.example.android.Auxiliar.Credentials;
import com.example.android.Auxiliar.Usuario;
import com.example.android.Remote.IRemote;

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
    private AsyncResponse asyncResponse = null;

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
                .baseUrl(IRemote.BASE_ROUTE)
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        IRemote service = retrofit.create(IRemote.class);

        Call<Void> call = service.registro(usuario);
        try {
            mResponse = call.execute();
            token = mResponse.headers().get("Authorization");
            Log.i("TOKEN", "El token es: " + token);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    protected void onPostExecute(Void aVoid) {
        if (mResponse!=null && mResponse.code()==200)
            asyncResponse.processFinishOK(token);
        else asyncResponse.processFinishERR();
    }

    public AsyncResponse getAsyncResponse() {
        return asyncResponse;
    }

    public void setAsyncResponse(AsyncResponse asyncResponse) {
        this.asyncResponse = asyncResponse;
    }
}
