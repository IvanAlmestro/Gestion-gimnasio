package gim.microservicio.service;

import gim.microservicio.entity.DiaRutina;
import gim.microservicio.entity.RegistroEntrenamiento;
import gim.microservicio.entity.Rutina;
import gim.microservicio.repository.DiaRutinaRepository;
import gim.microservicio.repository.RegistroEntrenamientoRepository;
import gim.microservicio.repository.RutinaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

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
    public Long registrarInicio(Long usuarioId, Long rutinaId, Long diaRutinaId) {
        Rutina rutina = rutinaRepository.findById(rutinaId)
                .orElseThrow(() -> new RuntimeException("Rutina no encontrada con id: " + rutinaId));
        DiaRutina dia = diaRutinaRepository.findById(diaRutinaId)
                .orElseThrow(() -> new RuntimeException("Día no encontrado con id: " + diaRutinaId));

        RegistroEntrenamiento nuevoRegistro = new RegistroEntrenamiento();
        nuevoRegistro.setCompletado(false); // Nace incompleto
        nuevoRegistro.setUsuarioId(usuarioId);
        nuevoRegistro.setRutina(rutina);
        nuevoRegistro.setDiaRutina(dia);
        nuevoRegistro.setFechaCompletado(LocalDateTime.now());

        RegistroEntrenamiento guardado = registroRepository.save(nuevoRegistro);
        return guardado.getId(); // Devolvemos el ID para que React lo use después
    }
    @Transactional
    public void finalizarEntrenamiento(Long registroId) {
        RegistroEntrenamiento registro = registroRepository.findById(registroId)
                .orElseThrow(() -> new RuntimeException("Registro no encontrado"));

        registro.setCompletado(true);
        registroRepository.save(registro);
    }
    public Long obtenerTotalEntrenamientos(Long idUsuario) {
        return registroRepository.countByUsuarioIdAndCompletadoTrue(idUsuario);
    }
    public int obtenerRachaActual(Long idUsuario){

        List<RegistroEntrenamiento> registros = registroRepository
                .findByUsuarioIdAndCompletadoTrueOrderByFechaCompletadoDesc(idUsuario);

        if (registros.isEmpty()) {
            return 0;
        }
        // 1. Extraemos solo las fechas (sin la hora) y quitamos repetidos del mismo día
        // Nota: Si tu campo fechaCompletado ya es LocalDate (y no LocalDateTime), borrá el .toLocalDate()
        List<LocalDate> fechas = registros.stream()
                .map(r -> r.getFechaCompletado().toLocalDate())
                .distinct()
                .toList();

        LocalDate hoy = LocalDate.now();
        LocalDate ultimoEntrenamiento = fechas.get(0);

        // 2. Si no entrenó ni hoy ni ayer, la racha ya se rompió y vale 0
        if (ultimoEntrenamiento.isBefore(hoy.minusDays(1))) {
            return 0;
        }
        // 3. Contamos hacia atrás cuántos días consecutivos entrenó
        int racha = 1;
        int i = 0;

        while (i < fechas.size() - 1 && fechas.get(i).minusDays(1).equals(fechas.get(i + 1))) {
            racha++;
            i++;
        }
        return racha;

    }

}