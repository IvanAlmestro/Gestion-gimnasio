package gim.microserviciopersona.service;

import gim.microserviciopersona.dto.PersonaPerfilDTO;
import gim.microserviciopersona.entity.Persona;
import gim.microserviciopersona.repository.PersonaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class PersonaService {
    @Autowired
    private PersonaRepository personaRepository;

    public Persona registrar(Persona persona){

        if(personaRepository.existsByEmail(persona.getEmail())){
            throw new RuntimeException("Error: Email ya registrado, intente con otro");
        }
        persona.setFechaRegistro(LocalDate.now());
        return personaRepository.save(persona);
    }

    public Persona login(String email, String password){
        Persona persona = personaRepository.findPersonaByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        if(!persona.getPassword().equals(password)){
            throw new RuntimeException("Password Incorrecta ");
        }
        return persona;
    }
    public PersonaPerfilDTO obtenerPerfil(Long id){
        Persona personaPerfil = personaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Id no encontrado"));

        return new PersonaPerfilDTO(personaPerfil);
    }
    /*public Persona actualizarPerfil(Long id, Persona datos){

    }

     */

    public void borrarPersona(Persona persona){
        if(personaRepository.existsById(persona.getId()))
            personaRepository.delete(persona);
        else {
            throw new RuntimeException("No existe la persona con el DNI que se intenta eliminar ");
        }
    }
}
