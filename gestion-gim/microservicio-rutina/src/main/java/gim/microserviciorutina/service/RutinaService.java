package gim.microserviciorutina.service;

import gim.microserviciorutina.dto.ActualizarRutinaDTO;
import gim.microserviciorutina.dto.RutinaDTO;
import gim.microserviciorutina.entity.Rutina;
import gim.microserviciorutina.repository.RutinaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class RutinaService {
    @Autowired
    private RutinaRepository rutinaRepository;

    public RutinaDTO obtenerRutina(Long idRutina){
        Rutina rutina = rutinaRepository.findById(idRutina)
                .orElseThrow(() -> new RuntimeException("No existe rutina con ese ID"));

        return new RutinaDTO(rutina);
    }
    public RutinaDTO crearRutina(RutinaDTO datos){
        if(rutinaRepository.existsByNombreAndIdUsuario(datos.getNombre(), datos.getIdUsuario())){
           throw new RuntimeException("Ya existe una rutina con ese nombre");
        }
        Rutina rutinaNueva = new Rutina();

        rutinaNueva.setNombre(datos.getNombre());
        rutinaNueva.setDescripcion(datos.getDescripcion());
        rutinaNueva.setObjetivo(datos.getObjetivo());
        rutinaNueva.setFechaCreacion(LocalDate.now());
        rutinaNueva.setIdUsuario(datos.getIdUsuario());
        // aca se podría guardar una variable rutinaCargada, pero modifica la misma referencia asi que no hace falta.
        rutinaRepository.save(rutinaNueva);
        return new RutinaDTO(rutinaNueva);
    }
    public RutinaDTO actualizarRutina(ActualizarRutinaDTO datos, Long id){
        Rutina rutina = rutinaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Rutina con Id no encontrado"));

        rutina.setNombre(datos.getNombre());
        rutina.setDescripcion(datos.getDescripcion());
        rutina.setObjetivo(datos.getObjetivo());

        Rutina rutinaActualizada = rutinaRepository.save(rutina);

        return new RutinaDTO(rutinaActualizada);
    }
}
