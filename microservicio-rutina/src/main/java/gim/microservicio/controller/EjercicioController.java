package gim.microservicio.controller;

import gim.microservicio.entity.Ejercicio;
import gim.microservicio.dto.EjercicioDTO;
import gim.microservicio.service.EjercicioService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/ejercicios")
public class EjercicioController {
    private EjercicioService ejercicioService;

    public EjercicioController(EjercicioService ejercicioService){
        this.ejercicioService = ejercicioService;
    }

    @GetMapping
    public ResponseEntity<List<EjercicioDTO>> obtenerEjercicios() {
        return ResponseEntity.ok(ejercicioService.obtenerEjercicios());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EjercicioDTO> obtenerEjercicio(@PathVariable Long id) {
        return ResponseEntity.ok(ejercicioService.obtenerEjercicio(id));
    }
    @PostMapping
    public ResponseEntity<Ejercicio> crearEjercicio(@RequestBody Ejercicio ejercicio) {
        return ResponseEntity.ok(ejercicioService.crearEjercicio(ejercicio));
    }
    @PutMapping("/{id}")
    public ResponseEntity<Ejercicio> actualizarEjercicio(
            @PathVariable Long id,
            @RequestBody Ejercicio ejercicio
    ) {
        return ResponseEntity.ok(ejercicioService.actualizarEjercicio(id, ejercicio));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarEjercicio(@PathVariable Long id) {
        ejercicioService.eliminarEjercicio(id);
        return ResponseEntity.noContent().build();
    }


}
