package gim.microservicio.service;

import gim.microservicio.entity.DiaRutina;
import gim.microservicio.entity.RegistroEntrenamiento;
import gim.microservicio.entity.Rutina;
import gim.microservicio.repository.DiaRutinaRepository;
import gim.microservicio.repository.RegistroEntrenamientoRepository;
import gim.microservicio.repository.RutinaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class RegistroEntrenamientoService {

    private final RegistroEntrenamientoRepository registroRepository;
    private final RutinaRepository rutinaRepository;

    private DiaRutinaRepository diaRutinaRepository;

    public RegistroEntrenamientoService(RegistroEntrenamientoRepository registroRepository, RutinaRepository rutinaRepository, DiaRutinaRepository diaRutinaRepository) {
        this.registroRepository = registroRepository;
        this.rutinaRepository = rutinaRepository;
        this.diaRutinaRepository = diaRutinaRepository;
    }

    @Transactional
    public void registrarInicio(Long usuarioId, Long rutinaId, Long diaRutinaId) { // <-- Agregamos el ID del día
        Rutina rutina = rutinaRepository.findById(rutinaId)
                .orElseThrow(() -> new RuntimeException("Rutina no encontrada con id: " + rutinaId));
        DiaRutina dia = diaRutinaRepository.findById(diaRutinaId)
                .orElseThrow(() -> new RuntimeException("Día no encontrado con id: " + diaRutinaId));

        RegistroEntrenamiento nuevoRegistro = new RegistroEntrenamiento();
        nuevoRegistro.setUsuarioId(usuarioId);
        nuevoRegistro.setRutina(rutina);

        nuevoRegistro.setDiaRutina(dia);
        nuevoRegistro.setFechaCompletado(LocalDateTime.now());

        registroRepository.save(nuevoRegistro);
    }

}