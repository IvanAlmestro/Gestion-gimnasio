package gim.microservicio.dto;

import gim.microservicio.enums.Objetivo;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ActualizarRutinaDTO {


    private String nombre;

    private String descripcion;

    private Objetivo objetivo;

}
