package gim.microservicio.controller;

import gim.microservicio.entity.Ejercicio;
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

    public ResponseEntity<List<Ejercicio>> obtenerEjercicios(@RequestBody Ejercicio ejercicio){

        return ResponseEntity.ok(ejercicioService.obtenerEjercicios());
    }
    @GetMapping("/{id}")
    public ResponseEntity<Optional<Ejercicio>> obtenerEjercicio(@RequestBody Ejercicio ejercicio, @PathVariable Long id){

        return ResponseEntity.ok(ejercicioService.obtenerEjercicio(id));
    }


    public ResponseEntity<Ejercicio> crearEjercicio(@RequestBody Ejercicio ejercicio){

        return ResponseEntity.status(HttpStatus.CREATED).body(ejercicio);
    }
    public ResponseEntity<Ejercicio> actualizarEjercicio(@RequestBody Ejercicio ejercicio){

        return ResponseEntity.status(HttpStatus.CREATED).body(ejercicio);
    }
    public ResponseEntity<Ejercicio> eliminarEjercicio(@RequestBody Ejercicio ejercicio){

        return ResponseEntity.status(HttpStatus.CREATED).body(ejercicio);
    }


}
