package gim.microservicio.controller;

import gim.microservicio.dto.*;
import gim.microservicio.entity.HistorialPeso;
import gim.microservicio.repository.HistorialPesoRepository;
import gim.microservicio.service.PersonaService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/personas")
public class PersonaController {

    private final PersonaService service;
    private final HistorialPesoRepository pesoRepository;

    public PersonaController(PersonaService service, HistorialPesoRepository pesoRepository){
        this.service = service;
        this.pesoRepository = pesoRepository;
    }

    @GetMapping
    public ResponseEntity<List<PersonaPerfilDTO>> obtenerPersonas(){
        return ResponseEntity.ok(service.obtenerPersonas());
    }

    //aclaracion: otro posible nombre seria obtenerPersonaPorID
    @GetMapping("/{id}")
    public ResponseEntity<PersonaPerfilDTO> obtenerPerfil(@PathVariable Long id){
        return ResponseEntity.ok(service.obtenerPerfil(id));
    }

    @PostMapping("/register")
    public ResponseEntity<PersonaPerfilDTO> registrar(@Valid @RequestBody RegistrarDTO persona){

        PersonaPerfilDTO nueva = service.registrar(persona);

        return ResponseEntity.status(HttpStatus.CREATED).body(nueva);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@Valid @RequestBody LoginDTO datos){
        return ResponseEntity.ok(service.login(datos));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PersonaPerfilDTO> actualizarPerfil(@PathVariable Long id, @RequestBody ActualizarPerfilDTO datos){

        return ResponseEntity.ok(service.actualizarPerfil(id, datos)) ;
    }

    @PutMapping("/{id}/password")
    public ResponseEntity<Map<String, String>> cambiarPassword(
            @PathVariable Long id,
            @RequestBody CambiarPasswordDTO dto) {

        try {
            // Llamás al método que ya armaste en el Service
            service.cambiarContrasena(id, dto);

            // Si no hay errores, devolvemos un 200 OK con un mensaje JSON
            return ResponseEntity.ok(Collections.singletonMap("mensaje", "Contraseña actualizada exitosamente"));

        } catch (RuntimeException e) {
            // Si el service tira error (ej: "Contraseña actual incorrecta"), mandamos un 400 Bad Request
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", e.getMessage()));
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarPersona(@PathVariable Long id){
        service.eliminarPersona(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}/historial-peso")
    public ResponseEntity<List<HistorialPesoDTO>> obtenerHistorialPeso(@PathVariable Long id){

        List<HistorialPeso> historial = pesoRepository.findByPersonaIdOrderByFechaAsc(id);

        List<HistorialPesoDTO> historialDTO = historial.stream().map(h -> {
            HistorialPesoDTO dto = new HistorialPesoDTO();
            dto.setPeso(h.getPeso());
            dto.setFecha(h.getFecha());
            return dto;
        }).toList();

        return ResponseEntity.ok(historialDTO);
    }

}

