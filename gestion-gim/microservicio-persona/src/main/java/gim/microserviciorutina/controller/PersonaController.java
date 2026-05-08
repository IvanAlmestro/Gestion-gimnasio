package gim.microserviciorutina.controller;

import gim.microserviciorutina.dto.ActualizarPerfilDTO;
import gim.microserviciorutina.dto.LoginDTO;
import gim.microserviciorutina.dto.PersonaPerfilDTO;
import gim.microserviciorutina.dto.RegistrarDTO;
import gim.microserviciorutina.service.PersonaService;
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

