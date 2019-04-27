package com.example.android;

import android.content.Context;
import android.content.SharedPreferences;
import android.os.AsyncTask;
import android.util.Log;

import com.example.android.Auxiliar.AsyncResponse;
import com.example.android.Auxiliar.Credentials;
import com.example.android.Remote.IRemote;

import java.io.IOException;

import okhttp3.OkHttpClient;
import okhttp3.logging.HttpLoggingInterceptor;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class LoginTask extends AsyncTask<Void, Void, Void> {
    private String usuario;
    private String contrasena;
    private Response<Void> mResponse = null;
    private String token;
    private AsyncResponse asyncResponse = null;

    public LoginTask(String usuario, String contrasena) {
        this.usuario = usuario;
        this.contrasena = contrasena;
    }


    @Override
    protected Void doInBackground(Void... voids) {

        Credentials credentials = new Credentials(usuario, contrasena);
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

        Call<Void> call = service.login(credentials);
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
