package gim.microservicio.dto;
import gim.microservicio.enums.Objetivo;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CrearRutinaDTO {
    @NotBlank
    private String nombre;

    private String descripcion;

    private Objetivo objetivo;

    private Long idUsuario;



}
