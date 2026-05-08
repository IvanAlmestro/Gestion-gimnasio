package gim.microserviciorutina.service;

import gim.microserviciorutina.dto.RutinaDTO;
import gim.microserviciorutina.entity.Rutina;
import gim.microserviciorutina.repository.RutinaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RutinaService {
    @Autowired
    private RutinaRepository rutinaRepository;

    public RutinaDTO obtenerRutina(Long idRutina){
        Rutina rutina = rutinaRepository.findById(idRutina)
                .orElseThrow(() -> new RuntimeException("No existe rutina con ese ID"));

        return new RutinaDTO(rutina);
    }
}
