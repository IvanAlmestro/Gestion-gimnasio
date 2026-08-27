package gim.microservicio.dto;

import gim.microservicio.entity.Ejercicio;
import lombok.Data;

@Data
public class EjercicioDTO {

    private Long id;
    private String nombre;
    private Integer series;
    private Integer repeticiones;
    private String descanso;
    private Integer rir;
    private String grupoMuscular;
    private Long rutinaId;

    public EjercicioDTO(Ejercicio ejercicio) {
        this.id = ejercicio.getId();
        this.nombre = ejercicio.getNombre();
        this.series = ejercicio.getSeries();
        this.repeticiones = ejercicio.getRepeticiones();
        this.descanso = ejercicio.getDescanso();
        this.grupoMuscular = ejercicio.getGrupoMuscular();
        this.rir = ejercicio.getRir();

    }


}