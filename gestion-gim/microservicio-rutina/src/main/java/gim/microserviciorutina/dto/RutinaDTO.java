package gim.microserviciorutina.dto;

import gim.microserviciorutina.entity.Rutina;

import java.time.LocalDate;

public class RutinaDTO {
    private String nombre;
    private String descripcion;
    private String objetivo; // esto estaria piola que sea un enum
    private LocalDate fechaCreacion;

    public RutinaDTO(Rutina datos) {
        this.nombre =datos.getNombre();
        this.descripcion = datos.getDescripcion();
        this.objetivo = datos.getObjetivo();
        this.fechaCreacion = datos.getFechaCreacion();
    }
}
