package gim.microserviciopersona.dto;


import gim.microserviciopersona.entity.Persona;

public class PersonaPerfilDTO {
    private Long id;
    private String nombre;
    private String apellido;
    private String email;
    private double altura;
    private double peso;
    public PersonaPerfilDTO(Persona persona){
        this.nombre = persona.getNombre();
        this.apellido = persona.getApellido();
        this.email = persona.getEmail();
        this.peso = persona.getPeso();
        this.altura = persona.getAltura();
    }
}
