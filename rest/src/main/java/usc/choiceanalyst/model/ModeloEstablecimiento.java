package usc.choiceanalyst.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import usc.choiceanalyst.model.auxiliar.Menu;

import java.text.Normalizer;
import java.util.List;


@Document(collection = "establecimientos")

public class ModeloEstablecimiento {

    @Id
    private String idEstablecimiento;
    private String idAdministrador;
    private String nombreEstablecimiento;
    private String localizacionEstablecimiento;
    private String tipoEstablecimiento;
    private List<Menu> menus;

    public String getIdEstablecimiento() {
        return idEstablecimiento;
    }

    public void setIdEstablecimiento(String idEstablecimiento) {
        this.idEstablecimiento = idEstablecimiento;
    }

    public String getIdAdministrador() {
        return idAdministrador;
    }

    public void setIdAdministrador(String idAdministrador) {
        this.idAdministrador = idAdministrador;
    }

    public String getNombreEstablecimiento() {
        return nombreEstablecimiento;
    }

    public void setNombreEstablecimiento(String nombreEstablecimiento) {
        this.nombreEstablecimiento = nombreEstablecimiento;
    }

    public String getLocalizacionEstablecimiento() {
        return localizacionEstablecimiento;
    }

    public void setLocalizacionEstablecimiento(String localizacionEstablecimiento) {
        this.localizacionEstablecimiento = localizacionEstablecimiento;
    }

    public String getTipoEstablecimiento() {
        return tipoEstablecimiento;
    }

    public void setTipoEstablecimiento(String tipoEstablecimiento) {
        this.tipoEstablecimiento = tipoEstablecimiento;
    }

    public List<Menu> getMenus() {
        return menus;
    }

    public void setMenus(List<Menu> menus) {
        this.menus = menus;
    }
}
