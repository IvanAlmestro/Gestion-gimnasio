package gim.microservicio.dto;

import gim.microservicio.entity.DiaRutina;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
@NoArgsConstructor
public class DiaRutinaDTO {

    private Long id;
    private String nombre;
    private List<EjercicioDiaDTO> ejercicios;

    public DiaRutinaDTO(DiaRutina dia) {
        this.id = dia.getId();
        this.nombre = dia.getNombre();

        // Transformamos las fichas puente a DTOs
        if (dia.getEjerciciosDelDia() != null) {
            this.ejercicios = dia.getEjerciciosDelDia().stream()
                    .map(EjercicioDiaDTO::new)
                    .toList();
        }
    }
}
