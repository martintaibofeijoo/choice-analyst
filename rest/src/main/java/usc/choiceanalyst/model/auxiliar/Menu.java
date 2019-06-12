package usc.choiceanalyst.model.auxiliar;

import java.util.List;

public class Menu {
    private String idMenu;
    private String nombreMenu;
    private List<String> fechasMenu;
    private List<Plato> platos;

    public String getIdMenu() {
        return idMenu;
    }

    public void setIdMenu(String idMenu) {
        this.idMenu = idMenu;
    }

    public List<String> getFechasMenu() {
        return fechasMenu;
    }

    public void setFechasMenu(List<String> fechasMenu) {
        this.fechasMenu = fechasMenu;
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
