package gim.microservicio.dto;

import gim.microservicio.entity.EjercicioDia;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class EjercicioDiaDTO {
    private Long id;
    private int series;

    private int repeticiones;
    private String notas;
    private Long ejercicioId;
    private String ejercicioNombre;

    public EjercicioDiaDTO(EjercicioDia ficha) {
        this.id = ficha.getId();
        this.series = ficha.getSeries();
        this.repeticiones = ficha.getRepeticiones();
        this.notas = ficha.getNotas();

        // Prevenimos NullPointerExceptions
        if (ficha.getEjercicio() != null) {
            this.ejercicioId = ficha.getEjercicio().getId();
            this.ejercicioNombre = ficha.getEjercicio().getNombre();
        }
    }
}
