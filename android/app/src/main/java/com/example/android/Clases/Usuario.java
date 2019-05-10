package com.example.android.Clases;


import com.google.gson.annotations.SerializedName;

public class Usuario extends Credentials {

    @SerializedName("correoElectronico")
    private String correoElectronico;
    @SerializedName("telefonoContacto")
    private String telefonoContacto;
    @SerializedName("nombre")
    private String nombre;
    @SerializedName("apellidos")
    private String apellidos;
    @SerializedName("fechaNacimiento")
    private String fechaNacimiento;
    @SerializedName("sexo")
    private String sexo;
    @SerializedName("origen")
    private String origen;
    @SerializedName("nivelEstudios")
    private String nivelEstudios;

    public Usuario(String username, String password, String correoElectronico, String telefonoContacto, String nombre, String apellidos, String fechaNacimiento, String sexo, String origen, String nivelEstudios) {
        super(username, password);
        this.correoElectronico = correoElectronico;
        this.telefonoContacto = telefonoContacto;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.fechaNacimiento = fechaNacimiento;
        this.sexo = sexo;
        this.origen = origen;
        this.nivelEstudios = nivelEstudios;
    }

    public String getCorreoElectronico() {
        return correoElectronico;
    }

    public void setCorreoElectronico(String correoElectronico) {
        this.correoElectronico = correoElectronico;
    }

    public String getTelefonoContacto() {
        return telefonoContacto;
    }

    public void setTelefonoContacto(String telefonoContacto) {
        this.telefonoContacto = telefonoContacto;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellidos() {
        return apellidos;
    }

    public void setApellidos(String apellidos) {
        this.apellidos = apellidos;
    }

    public String getFechaNacimiento() {
        return fechaNacimiento;
    }

    public void setFechaNacimiento(String fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }

    public String getSexo() {
        return sexo;
    }

    public void setSexo(String sexo) {
        this.sexo = sexo;
    }

    public String getOrigen() {
        return origen;
    }

    public void setOrigen(String origen) {
        this.origen = origen;
    }

    public String getNivelEstudios() {
        return nivelEstudios;
    }

    public void setNivelEstudios(String nivelEstudios) {
        this.nivelEstudios = nivelEstudios;
    }
}
