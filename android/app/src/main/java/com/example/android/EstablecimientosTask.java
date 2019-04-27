package com.example.android;

import android.os.AsyncTask;
import android.util.Log;

import com.example.android.Auxiliar.AsyncResponse;
import com.example.android.Auxiliar.Credentials;
import com.example.android.Auxiliar.Establecimiento;
import com.example.android.Remote.IRemote;

import java.io.IOException;
import java.util.Collection;

import okhttp3.OkHttpClient;
import okhttp3.logging.HttpLoggingInterceptor;
import retrofit2.Call;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class EstablecimientosTask extends AsyncTask<Void, Void, Void> {
    private String nombreEstablecimiento;
    private String token;
    private Response<Collection<Establecimiento>> mResponse = null;
    private AsyncResponse asyncResponse = null;

    public EstablecimientosTask(String nombreEstablecimiento, String token) {
        this.nombreEstablecimiento = nombreEstablecimiento;
        this.token = token;
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

        Call<Collection<Establecimiento>> call = service.establecimientos(nombreEstablecimiento, token);
        try {
            mResponse = call.execute();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    protected void onPostExecute(Void aVoid) {
        if (mResponse!=null && mResponse.code()==200)
            asyncResponse.processFinishOK(mResponse);
        else asyncResponse.processFinishERR();
    }

    public AsyncResponse getAsyncResponse() {
        return asyncResponse;
    }

    public void setAsyncResponse(AsyncResponse asyncResponse) {
        this.asyncResponse = asyncResponse;
    }
}
