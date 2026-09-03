package gim.microservicio.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class ActualizarPerfilDTO {
    private String nombre;
    private String apellido;
    private Double altura;
    private Double pesoActual;
    private Double pesoMeta;
    private String objetivo;
    private String fotoPerfil;
}