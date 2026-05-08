package gim.microserviciorutina.controller;

import gim.microserviciorutina.service.RutinaService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/rutinas")
public class RutinaController {

    private final RutinaService service;

    public RutinaController(RutinaService service){
        this.service = service;
    }


}

