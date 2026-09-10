package gim.microservicio.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class HistorialPesoDTO {
    private Double peso;
    private LocalDate fecha;
}
