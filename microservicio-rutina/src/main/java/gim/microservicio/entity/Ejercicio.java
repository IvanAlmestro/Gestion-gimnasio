package gim.microservicio.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Ejercicio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombre;
    private Integer series;
    private Integer repeticiones;
    private String descanso;
    private String grupoMuscular;
    @ManyToOne
    @JoinColumn(name= "rutina_id")
    private Rutina rutina;
}
