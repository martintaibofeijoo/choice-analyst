package usc.choiceanalyst.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import usc.choiceanalyst.model.auxiliar.Filtro;
import usc.choiceanalyst.model.auxiliar.Menu;
import usc.choiceanalyst.model.auxiliar.Pregunta;

import java.text.Normalizer;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;


@Document(collection = "establecimientos")

public class ModeloEstablecimiento {

    @Id private String idEstablecimiento;
    private String idAdministrador;
    private String nombre;
    private String localizacion;
    private String tipo;
    private List<Menu> menus;


    public ModeloEstablecimiento() {
    }

    public ModeloEstablecimiento(String idEstablecimiento, String idAdministrador, String nombre, String localizacion, String tipo) {
        this.idEstablecimiento=idEstablecimiento;
        this.idAdministrador=idAdministrador;
        this.nombre=nombre;
        this.localizacion=localizacion;
        this.tipo=tipo;
    }


    public String getIdEstablecimiento() {
        return idEstablecimiento;
    }

    public void setIdEstablecimiento(String idEstablecimiento) {
        String idEstablecimiento1 = Normalizer.normalize(idEstablecimiento, Normalizer.Form.NFD);
        idEstablecimiento1 = idEstablecimiento1.replaceAll("[^\\p{ASCII}]", "");
        idEstablecimiento1 = idEstablecimiento1.replace(" ", "-");
        idEstablecimiento1 = idEstablecimiento1.toLowerCase();
        this.idEstablecimiento = idEstablecimiento1;
    }

    public String getIdAdministrador() {
        return idAdministrador;
    }

    public void setIdAdministrador(String idAdministrador) {
        this.idAdministrador = idAdministrador;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getLocalizacion() {
        return localizacion;
    }

    public void setLocalizacion(String localizacion) {
        this.localizacion = localizacion;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public List<Menu> getMenus() {
        return menus;
    }

    public void setMenus(List<Menu> menus) {
        this.menus = menus;
    }
}
