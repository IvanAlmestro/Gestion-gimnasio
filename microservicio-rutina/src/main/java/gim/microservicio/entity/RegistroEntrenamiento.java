package gim.microservicio.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "registro_entrenamiento")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegistroEntrenamiento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "usuario_id", nullable = false)
    private Long usuarioId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "rutina_id", nullable = false)
    private Rutina rutina;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dia_rutina_id", nullable = false)
    private DiaRutina diaRutina;

    @Column(name = "fecha_completado", nullable = false)
    private LocalDateTime fechaCompletado;

    @Column(name = "completado", columnDefinition = "boolean default false")
    private boolean completado = false;
}