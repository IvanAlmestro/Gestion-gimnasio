package gim.microserviciopersona.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class ActualizarPerfilDTO {
    private String nombre;
    private String apellido;
    private Double altura;
    private Double peso;
    private String objetivo;
}