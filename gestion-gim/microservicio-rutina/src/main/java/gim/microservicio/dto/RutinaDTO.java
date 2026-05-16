package gim.microservicio.dto;

import gim.microservicio.entity.Rutina;
import gim.microservicio.enums.Objetivo;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
@Getter
@Setter
public class RutinaDTO {

    private Long id;

    private String nombre;

    private String descripcion;

    private Objetivo objetivo;

    private LocalDate fechaCreacion;

    private Long idUsuario;

    public RutinaDTO(Rutina datos) {
        this.id= datos.getId();
        this.nombre =datos.getNombre();
        this.descripcion = datos.getDescripcion();
        this.objetivo = datos.getObjetivo();
        this.fechaCreacion = datos.getFechaCreacion();
        this.idUsuario = datos.getIdUsuario();
    }

}
