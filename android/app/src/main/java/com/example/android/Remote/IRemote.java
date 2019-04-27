package com.example.android.Remote;



import com.example.android.Auxiliar.Credentials;
import com.example.android.Auxiliar.Establecimiento;

import java.util.Collection;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.Header;
import retrofit2.http.POST;
import retrofit2.http.GET;

public interface IRemote {

    String BASE_ROUTE = "http://10.0.2.2:9000/";

    @POST("login")
    Call<Void> login(@Body Credentials credentials);

    @GET("establecimientos")
    Call<Collection<Establecimiento>> establecimientos(@Body String nombreEstablecimiento, @Header("token") String token);

}
