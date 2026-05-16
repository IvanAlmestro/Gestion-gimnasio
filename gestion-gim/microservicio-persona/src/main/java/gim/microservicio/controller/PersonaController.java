package gim.microservicio.controller;

import gim.microservicio.dto.ActualizarPerfilDTO;
import gim.microservicio.dto.LoginDTO;
import gim.microservicio.dto.PersonaPerfilDTO;
import gim.microservicio.dto.RegistrarDTO;
import gim.microservicio.service.PersonaService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/personas")
public class PersonaController {

    private final PersonaService service;

    public PersonaController(PersonaService service){
        this.service = service;
    }

    @GetMapping
    public List<PersonaPerfilDTO> obtenerPersonas(){
        return service.obtenerPersonas();
    }

    @GetMapping("/{id}")
    public PersonaPerfilDTO obtenerPerfil(@PathVariable Long id){
        return service.obtenerPerfil(id);
    }

    @PostMapping("/register")
    public PersonaPerfilDTO registrar(@Valid @RequestBody RegistrarDTO persona){
        return service.registrar(persona);
    }

    @PostMapping("/login")
    public PersonaPerfilDTO login(@RequestBody LoginDTO datos){
        return service.login(datos);
    }



    @PutMapping("/{id}")
    public PersonaPerfilDTO actualizarPerfil(
            @PathVariable Long id,
            @RequestBody ActualizarPerfilDTO datos){

        return service.actualizarPerfil(id, datos);
    }

    @DeleteMapping("/{id}")
    public void eliminarPersona(@PathVariable Long id){
        service.eliminarPersona(id);
    }
}

