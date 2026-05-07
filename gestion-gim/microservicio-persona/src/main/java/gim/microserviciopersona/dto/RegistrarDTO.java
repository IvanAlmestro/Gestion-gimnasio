package gim.microserviciopersona.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter

public class RegistrarDTO {

    private String nombre;

    private String apellido;

    private String email;

    private String password;

    private Double peso;

    private Double altura;

    private String objetivo;

    private LocalDate fechaRegistro;
}