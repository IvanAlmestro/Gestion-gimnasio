package gim.microservicio.dto;


import gim.microservicio.entity.Persona;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter

public class PersonaPerfilDTO {
    private Long id;
    private String nombre;
    private String apellido;
    private String email;
    private Double altura;
    private Double pesoMeta;
    private Double pesoActual;
    private Double pesoInicial;
    private String objetivo;
    private LocalDate fechaRegistro;
    private String fotoPerfil;

    public PersonaPerfilDTO(Persona persona){
        this.id = persona.getId();
        this.nombre = persona.getNombre();
        this.apellido = persona.getApellido();
        this.email = persona.getEmail();
        this.altura = persona.getAltura();
        this.pesoMeta = persona.getPesoMeta();
        this.pesoInicial= persona.getPesoInicial();
        this.pesoActual = persona.getPesoActual();
        this.objetivo = persona.getObjetivo();
        this.fechaRegistro = persona.getFechaRegistro();
        this.fotoPerfil = persona.getFotoPerfil();

    }
}