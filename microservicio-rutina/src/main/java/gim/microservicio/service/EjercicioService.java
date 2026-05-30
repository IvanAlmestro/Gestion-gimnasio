package gim.microservicio.service;

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

    public List<Ejercicio> obtenerEjercicios(){
        return ejercicioRepository.findAll();
    }
    public Optional<Ejercicio> obtenerEjercicio(Long id){
        if(ejercicioRepository.findById(id).isEmpty()){
            throw new RuntimeException("No existe ejercicio con ese ID");
        }
        return ejercicioRepository.findById(id);
    }
    public Ejercicio crearEjercicio(Ejercicio ejercicio){
        return ejercicioRepository.save(ejercicio);
    }
    public void eliminarEjercicio(Long id){
        if(ejercicioRepository.existsById(id)){
            ejercicioRepository.deleteById(id);
        }else{
            throw new RuntimeException("No existe ejercicio con ese ID");
        }

    }
    public Ejercicio actualizarEjercicio(Long id, Ejercicio ejercicioActualizado) {

        Ejercicio ejercicio = ejercicioRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Ejercicio no encontrado"));

        ejercicio.setNombre(ejercicioActualizado.getNombre());
        ejercicio.setSeries(ejercicioActualizado.getSeries());
        ejercicio.setRepeticiones(ejercicioActualizado.getRepeticiones());

        return ejercicioRepository.save(ejercicio);
    }
}
