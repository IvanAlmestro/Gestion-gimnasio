package gim.microserviciopersona.service;

import gim.microserviciopersona.dto.ActualizarPerfilDTO;
import gim.microserviciopersona.dto.LoginDTO;
import gim.microserviciopersona.dto.PersonaPerfilDTO;
import gim.microserviciopersona.dto.RegistrarDTO;
import gim.microserviciopersona.entity.Persona;
import gim.microserviciopersona.repository.PersonaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class PersonaService {
    @Autowired
    private PersonaRepository personaRepository;

    public PersonaPerfilDTO registrar(RegistrarDTO datos){
        if(personaRepository.existsByEmail(datos.getEmail())){
            throw new RuntimeException("Error: Email ya registrado, intente con otro");
        }

        Persona persona = new Persona();
        persona.setNombre(datos.getNombre());
        persona.setApellido(datos.getApellido());
        persona.setEmail(datos.getEmail());
        //esto deberia hashearse mas adelante
        persona.setPassword(datos.getPassword());
        persona.setPeso(datos.getPeso());
        persona.setAltura(datos.getAltura());

        persona.setFechaRegistro(LocalDate.now());

        personaRepository.save(persona);

        return new PersonaPerfilDTO(persona);
    }

    public PersonaPerfilDTO login(LoginDTO datos){

        Persona persona = personaRepository.findByEmail(datos.getEmail())
                .orElseThrow(() -> new RuntimeException("Credenciales inválidas"));
        // despues encriptar password
        if(!persona.getPassword().equals(datos.getPassword())){
            throw new RuntimeException("Credenciales inválidas ");
        }

        return new PersonaPerfilDTO(persona);
    }
    public PersonaPerfilDTO obtenerPerfil(Long id){
        Persona personaPerfil = personaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Id no encontrado"));

        return new PersonaPerfilDTO(personaPerfil);
    }
    public PersonaPerfilDTO actualizarPerfil(Long id, ActualizarPerfilDTO datos){
        Persona persona = personaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Id no encontrado"));
        persona.setNombre(datos.getNombre());
        persona.setApellido(datos.getApellido());
        persona.setAltura(datos.getAltura());
        persona.setPeso(datos.getPeso());
        Persona pActualizada = personaRepository.save(persona);
        return new PersonaPerfilDTO(pActualizada);

    }



    public void borrarPersona(Persona persona){
        if(personaRepository.existsById(persona.getId()))
            personaRepository.delete(persona);
        else {
            throw new RuntimeException("No existe la persona con el DNI que se intenta eliminar ");
        }
    }
}
