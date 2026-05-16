package gim.microservicio.dto;
import gim.microservicio.enums.Objetivo;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CrearRutinaDTO {

    private String nombre;

    private String descripcion;

    private Objetivo objetivo;

    private Long idUsuario;



}
