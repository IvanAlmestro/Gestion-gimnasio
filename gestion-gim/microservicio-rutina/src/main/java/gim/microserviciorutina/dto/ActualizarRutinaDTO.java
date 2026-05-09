package gim.microserviciorutina.dto;

import gim.microserviciorutina.entity.Rutina;
import gim.microserviciorutina.enums.Objetivo;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ActualizarRutinaDTO {


    private String nombre;

    private String descripcion;

    private Objetivo objetivo;

    private Long idUsuario;

    public ActualizarRutinaDTO(Rutina datos) {
        this.nombre =datos.getNombre();
        this.descripcion = datos.getDescripcion();
        this.objetivo = datos.getObjetivo();
        this.idUsuario = datos.getIdUsuario();
    }
}
