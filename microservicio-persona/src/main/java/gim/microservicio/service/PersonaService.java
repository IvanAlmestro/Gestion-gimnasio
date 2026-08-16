package gim.microservicio.service;

import gim.microservicio.dto.*;
import gim.microservicio.entity.Persona;
import gim.microservicio.exception.custom.DuplicateEmailException;
import gim.microservicio.exception.custom.InvalidCredentialsException;
import gim.microservicio.exception.custom.PersonaNotFoundException;
import gim.microservicio.repository.PersonaRepository;
import gim.microservicio.security.JWTService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class PersonaService {

    @Autowired
    private PersonaRepository personaRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JWTService jwtService;

    public PersonaService(BCryptPasswordEncoder passwordEncoder,JWTService jwtService){
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public List<PersonaPerfilDTO> obtenerPersonas(){
        List<Persona> personas = personaRepository.findAll();
        return personas.stream()
                .map(PersonaPerfilDTO:: new)
                .toList();
    }
    public PersonaPerfilDTO obtenerPerfil(Long id){
        Persona personaPerfil = personaRepository.findById(id)
                .orElseThrow(() -> new PersonaNotFoundException("No existe persona con ese ID"));

        return new PersonaPerfilDTO(personaPerfil);
    }

    public PersonaPerfilDTO actualizarPerfil(Long id, ActualizarPerfilDTO datos){
        Persona persona = personaRepository.findById(id)
                .orElseThrow(() -> new PersonaNotFoundException("No existe persona con ese ID"));

        if(datos.getNombre() !=null)
            persona.setNombre(datos.getNombre());

        if(datos.getApellido() != null)
            persona.setApellido(datos.getApellido());

        if(datos.getAltura() != null)
            persona.setAltura(datos.getAltura());

        if(datos.getPesoActual() != null)
            persona.setPesoActual(datos.getPesoActual());

        if(datos.getObjetivo() != null)
            persona.setObjetivo(datos.getObjetivo());

        // aca lo guardo en variable pero no es necesario (para ver la diferencia a RutinaService)
        Persona pActualizada = personaRepository.save(persona);
        return new PersonaPerfilDTO(pActualizada);
    }

    public void eliminarPersona(Long id){
        if(personaRepository.existsById(id))
            personaRepository.deleteById(id);
        else {
            throw new PersonaNotFoundException("No existe la persona con el DNI que se intenta eliminar ");
        }
    }

    public AuthResponseDTO login(LoginDTO datos){

        Persona persona = personaRepository.findByEmail(datos.getEmail())
                .orElseThrow(() ->
                        new InvalidCredentialsException("Credenciales inválidas"));

        if(!passwordEncoder.matches(datos.getPassword(), persona.getPassword())){
            throw new InvalidCredentialsException("Credenciales inválidas");
        }

        String token = jwtService.generarToken(persona) ;

        PersonaPerfilDTO perfil = new PersonaPerfilDTO(persona);

        return new AuthResponseDTO(token, perfil);
    }

    public PersonaPerfilDTO registrar(RegistrarDTO datos){
        if(personaRepository.existsByEmail(datos.getEmail())){
            throw new DuplicateEmailException("Error: Email ya registrado, intente con otro");
        }

        Persona persona = new Persona();
        persona.setNombre(datos.getNombre());
        persona.setApellido(datos.getApellido());
        persona.setEmail(datos.getEmail());
        //hashing
        persona.setPassword(passwordEncoder.encode(datos.getPassword()));
        persona.setPesoInicial(datos.getPesoInicial());
        persona.setPesoActual(datos.getPesoInicial());
        persona.setAltura(datos.getAltura());
        persona.setObjetivo(datos.getObjetivo());

        persona.setFechaRegistro(LocalDate.now());

        personaRepository.save(persona);

        return new PersonaPerfilDTO(persona);
    }
}
