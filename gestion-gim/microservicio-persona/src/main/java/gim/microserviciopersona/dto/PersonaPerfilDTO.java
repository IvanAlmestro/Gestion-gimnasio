package gim.microserviciopersona.dto;


import gim.microserviciopersona.entity.Persona;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class PersonaPerfilDTO {
    private Long id;
    private String nombre;
    private String apellido;
    private String email;
    private Double altura;
    private Double peso;

    public PersonaPerfilDTO(Persona persona){
        this.id = persona.getId();
        this.nombre = persona.getNombre();
        this.apellido = persona.getApellido();
        this.email = persona.getEmail();
        this.altura = persona.getAltura();
        this.peso = persona.getPeso();

    }
}