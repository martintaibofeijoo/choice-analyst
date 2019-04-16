package usc.choiceanalyst.model.auxiliar;

import java.util.List;

public class Menu {
    private String idMenu;
    private String nombreMenu;
    private String precio;
    private List<String> fecha;
    private List<Plato> platos;

    public String getIdMenu() {
        return idMenu;
    }

    public void setIdMenu(String idMenu) {
        this.idMenu = idMenu;
    }

    public String getPrecio() {
        return precio;
    }

    public void setPrecio(String precio) {
        this.precio = precio;
    }

    public List<String> getFecha() {
        return fecha;
    }

    public void setFecha(List<String> fecha) {
        this.fecha = fecha;
    }

    public List<Plato> getPlatos() {
        return platos;
    }

    public void setPlatos(List<Plato> platos) {
        this.platos = platos;
    }

    public String getNombreMenu() {
        return nombreMenu;
    }

    public void setNombreMenu(String nombreMenu) {
        this.nombreMenu = nombreMenu;
    }
}
