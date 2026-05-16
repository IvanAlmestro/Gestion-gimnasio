package gim.microservicio.service;

import gim.microservicio.dto.ActualizarRutinaDTO;
import gim.microservicio.dto.CrearRutinaDTO;
import gim.microservicio.dto.RutinaDTO;
import gim.microservicio.entity.Rutina;
import gim.microservicio.repository.RutinaRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.util.List;

@Service
public class RutinaService {

    private RutinaRepository rutinaRepository;
    private final RestTemplate restTemplate;

    public RutinaService(RutinaRepository rutinaRepository,
                         RestTemplate restTemplate){

        this.rutinaRepository = rutinaRepository;
        this.restTemplate = restTemplate;
    }

    public List<RutinaDTO> obtenerRutinas(){
        List<Rutina> rutinas = rutinaRepository.findAll();
        return rutinas.stream()
                .map(RutinaDTO::new)
                .toList();
    }

    public RutinaDTO obtenerRutina(Long id){
        Rutina rutina = rutinaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("No existe rutina con ese ID"));

        return new RutinaDTO(rutina);
    }

    public List<RutinaDTO> obtenerRutinasUsuario(Long idUsuario){
        List<Rutina> rutinasUsuario= rutinaRepository.findByIdUsuario(idUsuario);
        return rutinasUsuario.stream()
                .map(RutinaDTO::new)
                .toList();
    }

    public RutinaDTO crearRutina(CrearRutinaDTO datos){
        String url = "http://localhost:8080/personas/" + datos.getIdUsuario();

        try{
            restTemplate.getForObject(url, Object.class);
        }catch (Exception e){
            throw new RuntimeException("El usuario no existe");
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

    public void eliminarRutina(Long id){
        if(!rutinaRepository.existsById(id)){
            throw new RuntimeException("No existe rutina con ese ID");
        }
        rutinaRepository.deleteById(id);
    }
}
