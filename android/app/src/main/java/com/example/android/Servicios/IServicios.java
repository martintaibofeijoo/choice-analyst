package com.example.android.Servicios;



import com.example.android.Clases.Credentials;
import com.example.android.Clases.Establecimiento;
import com.example.android.Clases.Experiencia;
import com.example.android.Clases.Experimento;
import com.example.android.Clases.Usuario;

import java.util.Collection;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.Header;
import retrofit2.http.POST;
import retrofit2.http.GET;
import retrofit2.http.Path;
import retrofit2.http.Query;

public interface IServicios {

    String BASE_ROUTE = "http://10.0.2.2:9000/";

    @POST("login")
    Call<Void> login(@Body Credentials credentials);

    @POST("usuarios/clientes")
    Call<Void> registro(@Body Usuario usuario);

    @GET("establecimientos")
    Call<Collection<Establecimiento>> establecimientos(@Query("nombreEstablecimiento") String nombreEstablecimiento, @Header("Authorization") String token);

    @GET("experimentos/obtenerExperimento/{idEstablecimiento}")
    Call<Experimento> obtenerExperimento(@Path("idEstablecimiento") String idEstablecimiento, @Header("Authorization") String token);

    @POST("experiencias")
    Call<Void> responderExperimento(@Body Experiencia experiencia, @Header("Authorization") String token);
}
