package gim.microservicio.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    private Integer rir;
    private String grupoMuscular;
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name= "rutina_id")
    private Rutina rutina;
}
