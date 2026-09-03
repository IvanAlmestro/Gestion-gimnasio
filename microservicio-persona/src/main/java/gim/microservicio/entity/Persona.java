package gim.microservicio.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name="personas")

public class Persona {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String nombre;
    @Column
    private String apellido;
    @Column(unique = true)
    private String email;
    private String password;
    private String objetivo;
    @Column(columnDefinition = "LONGTEXT")
    private String fotoPerfil;

    private Double pesoMeta; // Peso meta del usuario
    private Double pesoInicial; // Se guarda cuando se registra y no se toca más
    private Double pesoActual;  // Es el que se va actualizando
    private Double altura;

    private LocalDate fechaRegistro;


}
