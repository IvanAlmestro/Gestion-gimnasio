package gim.microservicio.controller;

import gim.microservicio.dto.ActualizarRutinaDTO;
import gim.microservicio.dto.ComenzarRutinaDTO;
import gim.microservicio.dto.CrearRutinaDTO;
import gim.microservicio.dto.RutinaDTO;
import gim.microservicio.service.RegistroEntrenamientoService;
import gim.microservicio.service.RutinaService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rutinas")
public class RutinaController {

    private final RutinaService service;
    private final RegistroEntrenamientoService registroService;

    public RutinaController(RutinaService service, RegistroEntrenamientoService registroService){
        this.service = service;
        this.registroService = registroService;
    }

    @PostMapping
    public ResponseEntity<RutinaDTO> crearRutina(@Valid @RequestBody CrearRutinaDTO datos){
        RutinaDTO nueva = service.crearRutina(datos);
        return ResponseEntity.status(HttpStatus.CREATED).body(nueva);
    }

    @GetMapping
    public ResponseEntity<List<RutinaDTO>> obtenerRutinas(){
        return ResponseEntity.ok(service.obtenerRutinas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<RutinaDTO> obtenerRutinaId(@PathVariable Long id){
        return ResponseEntity.ok(service.obtenerRutina(id));
    }

    @GetMapping("/usuario/{idUsuario}")
    public ResponseEntity<List<RutinaDTO>> obtenerRutinasUsuario(@PathVariable Long idUsuario){
        return ResponseEntity.ok(service.obtenerRutinasUsuario(idUsuario));
    }

    @PutMapping("/{id}")
    public ResponseEntity<RutinaDTO> actualizarRutina(@PathVariable Long id, @Valid @RequestBody ActualizarRutinaDTO datos){
        return ResponseEntity.ok(service.actualizarRutina(datos, id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarRutina(@PathVariable Long id){
        service.eliminarRutina(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/comenzar")
    public ResponseEntity<String> comenzarRutina(@RequestBody ComenzarRutinaDTO request) {
        // Llamamos al cerebro para que guarde todox
        registroService.registrarInicio(request.getUsuarioId(), request.getRutinaId());
        return ResponseEntity.ok("¡Entrenamiento registrado con éxito!");
    }
}

