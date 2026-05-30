package gim.microservicio.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Ejercicio {
    @GeneratedValue
    @Id
    private Long id;
    private String nombre;
    private Integer series;
    private Integer repeticiones;
    private String descanso;
    @ManyToOne
    @JoinColumn(name= "rutina_id")
    private Rutina rutina;
}
