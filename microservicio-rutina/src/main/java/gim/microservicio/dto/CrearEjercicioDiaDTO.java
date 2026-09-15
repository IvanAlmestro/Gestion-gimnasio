package gim.microservicio.dto;

import lombok.Data;

@Data
public class CrearEjercicioDiaDTO {
    private Long ejercicioId; // El ID del catálogo que el usuario seleccionó
    private Integer series;
    private Integer repeticiones;
    private String notas;
}