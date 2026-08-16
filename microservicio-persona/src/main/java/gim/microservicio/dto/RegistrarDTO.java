package gim.microservicio.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter

public class RegistrarDTO {

    @NotBlank
    @Size(min=3, max=50)
    private String nombre;

    @NotBlank
    @Size(min=3, max=50)
    private String apellido;

    @Email
    @NotBlank
    private String email;

    @Size(min = 6)
    @NotBlank
    private String password;

    private String objetivo;

    private Double pesoInicial;

    private Double altura;
}