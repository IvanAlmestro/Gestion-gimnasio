package gim.microservicio.dto;
import gim.microservicio.entity.Ejercicio;
import gim.microservicio.enums.Objetivo;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CrearRutinaDTO {
    @NotBlank
    private String nombre;
    private String descripcion;
    private Objetivo objetivo;
    private List<CrearDiaRutinaDTO> dias;
    private Long idUsuario;



}
