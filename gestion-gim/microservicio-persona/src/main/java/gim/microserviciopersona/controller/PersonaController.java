package gim.microserviciopersona.controller;

import gim.microserviciopersona.entity.Persona;
import gim.microserviciopersona.service.PersonaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/personas")
public class PersonaController {

    private final PersonaService service;

    public PersonaController(PersonaService service){
        this.service =service;
    }

    @PostMapping
    public Persona registrar(@RequestBody Persona persona){
         Persona personaNueva= service.registrar(persona);
         return ResponseEntity.ok(personaNueva).getBody();
    }
}
