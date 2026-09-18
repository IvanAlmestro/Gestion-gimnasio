package gim.microservicio.dto;

import lombok.Data;

@Data
public class ComenzarRutinaDTO {
    private Long usuarioId;
    private Long rutinaId;
    private Long diaRutinaId;
}
