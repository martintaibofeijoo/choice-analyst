package usc.choiceanalyst.model.auxiliar;

import java.util.ArrayList;

public class DatosGrafica {
    private ArrayList<String> opciones;
    private ArrayList<Integer> valores;


    public DatosGrafica(){
        this.opciones=new ArrayList<>();
        this.valores=new ArrayList<>();
    }
    public ArrayList<String> getOpciones() {
        return opciones;
    }

    public void setOpciones(ArrayList<String> opciones) {
        this.opciones = opciones;
    }

    public ArrayList<Integer> getValores() {
        return valores;
    }

    public void setValores(ArrayList<Integer> valores) {
        this.valores = valores;
    }
}
