package gim.microservicio.service;

import gim.microservicio.entity.RegistroEntrenamiento;
import gim.microservicio.entity.Rutina;
import gim.microservicio.repository.RegistroEntrenamientoRepository;
import gim.microservicio.repository.RutinaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class RegistroEntrenamientoService {

    private final RegistroEntrenamientoRepository registroRepository;
    private final RutinaRepository rutinaRepository;

    public RegistroEntrenamientoService(RegistroEntrenamientoRepository registroRepository, RutinaRepository rutinaRepository) {
        this.registroRepository = registroRepository;
        this.rutinaRepository = rutinaRepository;
    }

    @Transactional
    public void registrarInicio(Long usuarioId, Long rutinaId) {
        //Verifico que la rutina exista
        Rutina rutina = rutinaRepository.findById(rutinaId)
                .orElseThrow(() -> new RuntimeException("Rutina no encontrada con id: " + rutinaId));

        RegistroEntrenamiento nuevoRegistro = new RegistroEntrenamiento();
        nuevoRegistro.setUsuarioId(usuarioId);
        nuevoRegistro.setRutina(rutina);
        nuevoRegistro.setFechaCompletado(LocalDateTime.now()); // Guarda el momento exacto del clic

        registroRepository.save(nuevoRegistro);
    }
}