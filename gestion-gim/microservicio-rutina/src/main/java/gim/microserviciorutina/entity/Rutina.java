package gim.microserviciorutina.entity;

import gim.microserviciorutina.enums.Objetivo;
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
    @Column
    private Long idRutina;

    private String nombre;

    private String descripcion;

    @Enumerated(EnumType.STRING)
    private Objetivo objetivo;

    private LocalDate fechaCreacion;

    private Long idUsuario;




}
