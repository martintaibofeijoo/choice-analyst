package usc.choiceanalyst.model;

import usc.choiceanalyst.model.auth.Credentials;
import java.text.SimpleDateFormat;

import java.util.Date;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "usuarios")

public class ModeloUsuario extends Credentials {
    private List<String> roles;
    private String correoElectronico;
    private String movil;
    private String nombre;
    private String apellidos;
    private String fechaRegistro;
    private Integer edad;
    private String sexo;
    private String origen;
    private String nivelEstudios;
    private String idEstablecimiento;


    public ModeloUsuario(){
        
    }

    public ModeloUsuario(String correoElectronico, List<String> roles){
        String pattern = "dd-MM-yyyy";
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
        String date = simpleDateFormat.format(new Date());
        this.fechaRegistro =date;
        this.correoElectronico =correoElectronico;
        this.roles=roles;
    }


    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }

    public String getCorreoElectronico() {
        return correoElectronico;
    }

    public void setCorreoElectronico(String correoElectronico) {
        this.correoElectronico = correoElectronico;
    }

    public String getMovil() {
        return movil;
    }

    public void setMovil(String movil) {
        this.movil = movil;
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

    public Integer getEdad() {
        return edad;
    }

    public void setEdad(Integer edad) {
        this.edad = edad;
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

    public String getIdEstablecimiento() {
        return idEstablecimiento;
    }

    public void setIdEstablecimiento(String idEstablecimiento) {
        this.idEstablecimiento = idEstablecimiento;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;

        ModeloUsuario fullUser = (ModeloUsuario) o;

        return roles != null ? roles.equals(fullUser.roles) : fullUser.roles == null;
    }

    @Override
    public ModeloUsuario setPassword(String password) {
        super.setPassword(password);
        return this;
    }

    @Override
    public ModeloUsuario setUsername(String username) {
        super.setUsername(username);
        return this;
    }

    @Override
    public int hashCode() {
        int result = super.hashCode();
        result = 31 * result + (roles != null ? roles.hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return String.format("FullUser{ username='%s', password='%s', roles=%s", super.getUsername(), super.getPassword(), roles);
    }
}
