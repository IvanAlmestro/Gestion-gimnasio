package gim.microservicio.dto;

import lombok.Data;

import java.util.List;

@Data
public class CrearDiaRutinaDTO {
    private String nombre;
    private List<CrearEjercicioDiaDTO> ejercicios;
}