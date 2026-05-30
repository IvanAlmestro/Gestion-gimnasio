package gim.microservicio.entity;

import gim.microservicio.enums.Objetivo;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "rutinas")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Rutina {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id_rutina")
    private Long id;

    @Column
    private String nombre;
    @Column
    private String descripcion;
    @Column
    @Enumerated(EnumType.STRING)
    private Objetivo objetivo;

    @OneToMany(mappedBy = "rutina")
    private List<Ejercicio> ejercicios;

    private LocalDate fechaCreacion;

    private Long idUsuario;



}
