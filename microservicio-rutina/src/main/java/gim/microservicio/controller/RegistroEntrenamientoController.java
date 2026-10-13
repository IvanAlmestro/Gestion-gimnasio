package gim.microservicio.controller;

import gim.microservicio.service.RegistroEntrenamientoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/registros")
public class RegistroEntrenamientoController {

    RegistroEntrenamientoService registroService;

    public RegistroEntrenamientoController(RegistroEntrenamientoService registroService){
        this.registroService = registroService;
    }

    @GetMapping("/usuario/{idUsuario}/diasEntrenados")
    public ResponseEntity<Long> obtenerTotalEntrenamientos(@PathVariable Long idUsuario){
        return ResponseEntity.ok(registroService.obtenerTotalEntrenamientos(idUsuario));
    }
    @GetMapping("/usuario/{idUsuario}/racha")
    public ResponseEntity<Integer> obtenerRachaActual(@PathVariable Long idUsuario) {
        return ResponseEntity.ok(registroService.obtenerRachaActual(idUsuario));
    }

    // El endpoint para empezar a entrenar
    @PostMapping("/usuario/{usuarioId}/rutina/{rutinaId}/comenzar/{diaRutinaId}")
    public ResponseEntity<Long> comenzarEntrenamiento(
            @PathVariable Long usuarioId,
            @PathVariable Long rutinaId,
            @PathVariable Long diaRutinaId) {
        // Guardamos el ID que nos da el service
        Long idRegistro = registroService.registrarInicio(usuarioId, rutinaId, diaRutinaId);
        // Devolvemos el ID pelado al frontend
        return ResponseEntity.ok(idRegistro);
    }
    @PutMapping("/{registroId}/finalizar")
    public ResponseEntity<String> finalizarEntrenamiento(@PathVariable Long registroId) {
        registroService.finalizarEntrenamiento(registroId);
        return ResponseEntity.ok("¡Rutina completada!");
    }


}
