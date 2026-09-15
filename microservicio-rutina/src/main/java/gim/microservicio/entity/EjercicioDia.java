package gim.microservicio.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "ejercicios_dia")
@Data
public class EjercicioDia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // A qué día pertenece (Ej: Día 1: Pecho)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dia_rutina_id")
    private DiaRutina diaRutina;

    // Qué ejercicio del catálogo es (Ej: Press Banca)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ejercicio_id")
    private Ejercicio ejercicio;

    // Los datos específicos de ESE día
    private Integer series;
    private Integer repeticiones;
    private String notas; // Ej: "Hacer lento en la bajada"
}