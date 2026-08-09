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

    // A qué usuario pertenece este entrenamiento
    @Column(name = "usuario_id", nullable = false)
    private Long usuarioId;

    // Qué rutina completó
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "rutina_id", nullable = false)
    private Rutina rutina;

    // Cuándo hizo clic en "Comenzar"
    @Column(name = "fecha_completado", nullable = false)
    private LocalDateTime fechaCompletado;
}