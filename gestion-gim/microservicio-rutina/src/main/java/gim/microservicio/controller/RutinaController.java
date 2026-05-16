package gim.microservicio.controller;

import gim.microservicio.dto.ActualizarRutinaDTO;
import gim.microservicio.dto.CrearRutinaDTO;
import gim.microservicio.dto.RutinaDTO;
import gim.microservicio.service.RutinaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rutinas")
public class RutinaController {

    private final RutinaService service;

    public RutinaController(RutinaService service){
        this.service = service;
    }

    @PostMapping
    public RutinaDTO crearRutina(@RequestBody CrearRutinaDTO datos){
        return service.crearRutina(datos);
    }

    @GetMapping
    public List<RutinaDTO> obtenerRutinas(){
        return service.obtenerRutinas();
    }
    @GetMapping("/{id}")
    public RutinaDTO obtenerRutinaId(@PathVariable Long id){
        return service.obtenerRutina(id);
    }

    @GetMapping("/usuario/{idUsuario}")
    public List<RutinaDTO> obtenerRutinasUsuario(@PathVariable Long idUsuario){
        return service.obtenerRutinasUsuario(idUsuario);
    }

    @PutMapping("/{id}")
    public RutinaDTO actualizarRutina(@RequestBody ActualizarRutinaDTO datos,@PathVariable Long id){
        return service.actualizarRutina(datos, id);
    }

    @DeleteMapping("/{id}")
    public void eliminarRutina(@PathVariable Long id){
        service.eliminarRutina(id);
    }
}

