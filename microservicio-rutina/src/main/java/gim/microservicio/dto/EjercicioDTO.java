package gim.microservicio.dto;

import gim.microservicio.entity.Ejercicio;

public class EjercicioDTO {

    private Long id;
    private String nombre;
    private Integer series;
    private Integer repeticiones;
    private String descanso;
    private String grupoMuscular;
    private Long rutinaId;

    public EjercicioDTO(Ejercicio ejercicio) {
        this.id = ejercicio.getId();
        this.nombre = ejercicio.getNombre();
        this.series = ejercicio.getSeries();
        this.repeticiones = ejercicio.getRepeticiones();
        this.descanso = ejercicio.getDescanso();
        this.grupoMuscular = ejercicio.getGrupoMuscular();

        if (ejercicio.getRutina() != null) {
            this.rutinaId = ejercicio.getRutina().getId();
        }
    }

    public Long getId() {
        return id;
    }

    public String getNombre() {
        return nombre;
    }

    public Integer getSeries() {
        return series;
    }

    public Integer getRepeticiones() {
        return repeticiones;
    }

    public String getDescanso() {
        return descanso;
    }

    public String getGrupoMuscular() {
        return grupoMuscular;
    }

    public Long getRutinaId() {
        return rutinaId;
    }
}