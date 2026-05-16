package gim.microservicio.entity;

import gim.microservicio.enums.Objetivo;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

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

    private String nombre;

    private String descripcion;

    @Enumerated(EnumType.STRING)
    private Objetivo objetivo;

    private LocalDate fechaCreacion;

    private Long idUsuario;



}
