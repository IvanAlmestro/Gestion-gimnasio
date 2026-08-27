package gim.microservicio.service;

import gim.microservicio.dto.ActualizarRutinaDTO;
import gim.microservicio.dto.CrearRutinaDTO;
import gim.microservicio.dto.EjercicioDTO;
import gim.microservicio.dto.RutinaDTO;
import gim.microservicio.entity.Ejercicio;
import gim.microservicio.entity.Rutina;
import gim.microservicio.exception.custom.PersonaNotFoundException;
import gim.microservicio.exception.custom.RutinaNotFoundException;
import gim.microservicio.repository.EjercicioRepository;
import gim.microservicio.repository.RutinaRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.time.LocalDate;
import java.util.List;

@Service
public class RutinaService {

    private RutinaRepository rutinaRepository;
    private EjercicioRepository ejercicioRepository;
    private final RestTemplate restTemplate;

    public RutinaService(RutinaRepository rutinaRepository, RestTemplate restTemplate, EjercicioRepository ejercicioRepository){
        this.ejercicioRepository =ejercicioRepository;
        this.rutinaRepository = rutinaRepository;
        this.restTemplate = restTemplate;
    }

    public List<RutinaDTO> obtenerRutinas(){
        List<Rutina> rutinas = rutinaRepository.findAll();
        return rutinas.stream()
                .map(RutinaDTO::new)
                .toList();
    }
    @Transactional(readOnly = true)
    public RutinaDTO obtenerRutina(Long id){
        Rutina rutina = rutinaRepository.findById(id)
                .orElseThrow(() -> new RutinaNotFoundException("No existe rutina con ese ID"));

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
            // 1. Extraemos el token que mandó el usuario en la petición original (desde el Gateway/Frontend)
            HttpEntity<String> entity = getStringHttpEntity();

            // 3. Hacemos la llamada protegida usando exchange en lugar de getForObject
            restTemplate.exchange(url, HttpMethod.GET, entity, Object.class);

        } catch (Exception e){
            System.out.println("Error real del RestTemplate: " + e.getMessage());
            throw new PersonaNotFoundException("El usuario con ese ID no existe");
        }

        Rutina rutinaNueva = new Rutina();

        List<Ejercicio> ejerciciosAsignados = ejercicioRepository.findAllById(datos.getEjerciciosIds());
        rutinaNueva.setEjercicios(ejerciciosAsignados);

        rutinaNueva.setNombre(datos.getNombre());
        rutinaNueva.setDescripcion(datos.getDescripcion());
        rutinaNueva.setObjetivo(datos.getObjetivo());
        rutinaNueva.setFechaCreacion(LocalDate.now());
        rutinaNueva.setIdUsuario(datos.getIdUsuario());

        rutinaRepository.save(rutinaNueva);
        return new RutinaDTO(rutinaNueva);
    }

    @NonNull
    private static HttpEntity<String> getStringHttpEntity() {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        String tokenHeader = request.getHeader("Authorization");

        // 2. Armamos los headers para el RestTemplate reenvíando el token
        HttpHeaders headers = new HttpHeaders();
        if (tokenHeader != null && !tokenHeader.isEmpty()) {
            headers.set("Authorization", tokenHeader);
        }
        HttpEntity<String> entity = new HttpEntity<>(headers);
        return entity;
    }

    public RutinaDTO actualizarRutina(ActualizarRutinaDTO datos, Long id){
        Rutina rutina = rutinaRepository.findById(id)
                .orElseThrow(() -> new RutinaNotFoundException("No existe rutina con ese ID"));

        if(datos.getNombre() != null){
            rutina.setNombre(datos.getNombre());
        }
        if(datos.getDescripcion() != null){
            rutina.setDescripcion(datos.getDescripcion());
        }
        if(datos.getObjetivo() != null){
            rutina.setObjetivo(datos.getObjetivo());
        }


        Rutina rutinaActualizada = rutinaRepository.save(rutina);

        return new RutinaDTO(rutinaActualizada);
    }

    public void eliminarRutina(Long id){
        if(!rutinaRepository.existsById(id)){
            throw new RutinaNotFoundException("No existe rutina con ese ID");
        }
        rutinaRepository.deleteById(id);
    }
}
