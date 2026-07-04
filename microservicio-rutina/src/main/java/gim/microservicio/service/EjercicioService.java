package gim.microservicio.service;

import gim.microservicio.dto.EjercicioDTO;
import gim.microservicio.entity.Ejercicio;
import gim.microservicio.repository.EjercicioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EjercicioService {
    @Autowired
    private EjercicioRepository ejercicioRepository;

    public List<EjercicioDTO> obtenerEjercicios() {
        return ejercicioRepository.findAll()
                .stream()
                .map(EjercicioDTO::new)
                .toList();
    }
    public EjercicioDTO obtenerEjercicio(Long id) {
        Ejercicio ejercicio = ejercicioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("No existe ejercicio con ese ID"));

        return new EjercicioDTO(ejercicio);
    }
    public Ejercicio crearEjercicio(Ejercicio ejercicio) {
        return ejercicioRepository.save(ejercicio);
    }
    public void eliminarEjercicio(Long id) {
        if (ejercicioRepository.existsById(id)) {
            ejercicioRepository.deleteById(id);
        } else {
            throw new RuntimeException("No existe ejercicio con ese ID");
        }
    }
    public Ejercicio actualizarEjercicio(Long id, Ejercicio ejercicioActualizado) {
        Ejercicio ejercicio = ejercicioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ejercicio no encontrado"));

        ejercicio.setNombre(ejercicioActualizado.getNombre());
        ejercicio.setSeries(ejercicioActualizado.getSeries());
        ejercicio.setRepeticiones(ejercicioActualizado.getRepeticiones());
        ejercicio.setDescanso(ejercicioActualizado.getDescanso());
        ejercicio.setGrupoMuscular(ejercicioActualizado.getGrupoMuscular());

        return ejercicioRepository.save(ejercicio);
    }
}
