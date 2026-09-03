package gim.microservicio.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PersonaDTO {
    private Long id;
    private String nombre;
    private String email;
    private String dni;
    private String objetivo;

}
