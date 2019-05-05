package usc.choiceanalyst.model;

import usc.choiceanalyst.model.auth.Credentials;

import java.text.SimpleDateFormat;

import java.util.Date;
import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "usuarios")

public class ModeloUsuario extends Credentials {
    private String rol;
    private String correoElectronico;
    private String telefonoContacto;
    private String nombre;
    private String apellidos;
    private String fechaRegistro;
    private String fechaNacimiento;
    private String sexo;
    private String origen;
    private String nivelEstudios;
    private List<String> idsEstablecimientos;


    public ModeloUsuario() {

    }

    public ModeloUsuario(String rol) {
        String pattern = "dd-MM-yyyy";
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
        String date = simpleDateFormat.format(new Date());
        this.fechaRegistro = date;
        this.rol = rol;
    }


    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
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

    public String getFechaRegistro() {
        return fechaRegistro;
    }

    public void setFechaRegistro(String fechaRegistro) {
        this.fechaRegistro = fechaRegistro;
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

    public List<String> getIdsEstablecimientos() {
        return idsEstablecimientos;
    }

    public void setIdsEstablecimientos(List<String> idsEstablecimientos) { this.idsEstablecimientos = idsEstablecimientos; }
}
