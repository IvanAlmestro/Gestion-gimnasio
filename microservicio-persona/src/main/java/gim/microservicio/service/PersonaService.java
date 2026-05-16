package gim.microservicio.service;

import gim.microservicio.dto.ActualizarPerfilDTO;
import gim.microservicio.dto.LoginDTO;
import gim.microservicio.dto.PersonaPerfilDTO;
import gim.microservicio.dto.RegistrarDTO;
import gim.microservicio.entity.Persona;
import gim.microservicio.repository.PersonaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
public class PersonaService {

    @Autowired
    private PersonaRepository personaRepository;

    public List<PersonaPerfilDTO> obtenerPersonas(){
        List<Persona> personas = personaRepository.findAll();
        return personas.stream()
                .map(PersonaPerfilDTO:: new)
                .toList();
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
        persona.setObjetivo(datos.getObjetivo());
        // aca lo guardo en variable pero no es necesario (para ver la diferencia a RutinaService)
        Persona pActualizada = personaRepository.save(persona);
        return new PersonaPerfilDTO(pActualizada);

    }

    public void eliminarPersona(Long id){
        if(personaRepository.existsById(id))
            personaRepository.deleteById(id);
        else {
            throw new RuntimeException("No existe la persona con el DNI que se intenta eliminar ");
        }
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
        persona.setObjetivo(datos.getObjetivo());

        persona.setFechaRegistro(LocalDate.now());

        personaRepository.save(persona);

        return new PersonaPerfilDTO(persona);
    }
}
