package gim.microserviciopersona.controller;

import gim.microserviciopersona.dto.ActualizarPerfilDTO;
import gim.microserviciopersona.dto.LoginDTO;
import gim.microserviciopersona.dto.PersonaPerfilDTO;
import gim.microserviciopersona.dto.RegistrarDTO;
import gim.microserviciopersona.service.PersonaService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/personas")
public class PersonaController {

    private final PersonaService service;

    public PersonaController(PersonaService service){
        this.service = service;
    }

    @PostMapping("/register")
    public PersonaPerfilDTO registrar(@RequestBody RegistrarDTO persona){
        return service.registrar(persona);
    }

    @PostMapping("/login")
    public PersonaPerfilDTO login(@RequestBody LoginDTO datos){
        return service.login(datos);
    }

    @GetMapping("/{id}")
    public PersonaPerfilDTO obtenerPerfil(@PathVariable Long id){
        return service.obtenerPerfil(id);
    }

    @PutMapping("/{id}")
    public PersonaPerfilDTO actualizarPerfil(
            @PathVariable Long id,
            @RequestBody ActualizarPerfilDTO datos){

        return service.actualizarPerfil(id, datos);
    }
}

