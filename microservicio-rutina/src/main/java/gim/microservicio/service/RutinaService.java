package gim.microservicio.service;

import gim.microservicio.dto.*;
import gim.microservicio.entity.*;
import gim.microservicio.exception.custom.PersonaNotFoundException;
import gim.microservicio.exception.custom.RutinaNotFoundException;
import gim.microservicio.repository.EjercicioRepository;
import gim.microservicio.repository.RegistroEntrenamientoRepository;
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
    private RegistroEntrenamientoRepository registroRepository;
    private final RestTemplate restTemplate;

    public RutinaService(RutinaRepository rutinaRepository, RestTemplate restTemplate,
                         EjercicioRepository ejercicioRepository, RegistroEntrenamientoRepository registroRepository) {
        this.registroRepository = registroRepository;
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

    public List<RutinaDTO> obtenerRutinasUsuario(Long idUsuario) {
        List<Rutina> rutinas = rutinaRepository.findByIdUsuario(idUsuario); // O como se llame tu método del repo

        return rutinas.stream().map(rutina -> {
            RutinaDTO dto = new RutinaDTO(rutina);
            if (rutina.isActiva()) {
                dto.setProximoDiaIndice(calcularProximoDia(idUsuario, rutina));
            }
            return dto;
        }).toList();
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
        rutinaNueva.setNombre(datos.getNombre());
        rutinaNueva.setDescripcion(datos.getDescripcion());
        rutinaNueva.setObjetivo(datos.getObjetivo());
        rutinaNueva.setFechaCreacion(LocalDate.now());
        rutinaNueva.setIdUsuario(datos.getIdUsuario());

        // Iteramos sobre los días que manda el frontend
        if (datos.getDias() != null) {
            for (CrearDiaRutinaDTO diaDto : datos.getDias()) {
                DiaRutina dia = new DiaRutina();
                dia.setNombre(diaDto.getNombre());
                dia.setRutina(rutinaNueva); // Conectamos el día con la rutina padre

                // Iteramos sobre los ejercicios de ese día específico
                if (diaDto.getEjercicios() != null) {
                    for (CrearEjercicioDiaDTO ejDto : diaDto.getEjercicios()) {
                        EjercicioDia ficha = new EjercicioDia();
                        ficha.setSeries(ejDto.getSeries());
                        ficha.setRepeticiones(ejDto.getRepeticiones());
                        ficha.setNotas(ejDto.getNotas());
                        ficha.setDiaRutina(dia); // Conectamos la ficha con su día

                        // Buscamos el libro original en el catálogo
                        Ejercicio ejercicioCatalogo = ejercicioRepository.findById(ejDto.getEjercicioId())
                                .orElseThrow(() -> new RuntimeException("Ejercicio no encontrado en el catálogo: " + ejDto.getEjercicioId()));

                        ficha.setEjercicio(ejercicioCatalogo);

                        // Guardamos la ficha en la lista del día
                        dia.getEjerciciosDelDia().add(ficha);
                    }
                }
                // Guardamos el día en la lista de la rutina
                rutinaNueva.getDiasRutina().add(dia);
            }
        }
        // ---------------------------------

        // Hibernate guarda la Rutina, y por Cascade guarda los Días y las Fichas automáticamente
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
    @Transactional
    public void activarRutina(Long idRutina) {

        // 1. Buscamos la rutina que el usuario tocó
        Rutina rutinaDestino = rutinaRepository.findById(idRutina)
                .orElseThrow(() -> new RuntimeException("Rutina no encontrada"));

        // 2. Buscamos todas las rutinas que le pertenecen a este mismo usuario
        Long idUsuario = rutinaDestino.getIdUsuario();
        List<Rutina> todasLasRutinas = rutinaRepository.findByIdUsuario(idUsuario);

        // 3. Recorremos la lista: prendemos la elegida y apagamos el resto
        for (Rutina rutina : todasLasRutinas) {
            if (rutina.getId().equals(idRutina)) {
                rutina.setActiva(true);
            } else {
                rutina.setActiva(false);
            }
        }

        // 4. Guardamos todas las rutinas actualizadas de una sola vez
        rutinaRepository.saveAll(todasLasRutinas);
    }

    public RutinaDTO obtenerRutinaActiva(Long idUsuario) {
        // 1. Buscamos la rutina activa. Si no hay ninguna, devolvemos null
        Rutina rutinaActiva = rutinaRepository.findByIdUsuarioAndActivaTrue(idUsuario)
                .orElse(null);

        RutinaDTO dto = new RutinaDTO(rutinaActiva);

        if (rutinaActiva == null) {
            return null; // Si no hay activa, devolvemos null
        }
        // 2. Buscamos el último entrenamiento de esta rutina
        RegistroEntrenamiento ultimoRegistro = registroRepository
                .findTopByUsuarioIdAndRutinaIdOrderByFechaCompletadoDesc(idUsuario, rutinaActiva.getId())
                .orElse(null);
        int proximoIndice = 0;

        // 3. Si ya entrenó antes, calculamos el siguiente
        if(ultimoRegistro != null && ultimoRegistro.getDiaRutina()!= null){
            List<DiaRutina> dias = rutinaActiva.getDiasRutina();
            for(int i = 0; i < dias.size() ; i++){
                if(dias.get(i).getId().equals(ultimoRegistro.getDiaRutina().getId())){
                    proximoIndice = i+1;
                }
            }
            if(proximoIndice>=dias.size()){
                proximoIndice=0;
            }

        }

        dto.setProximoDiaIndice(proximoIndice);

        return dto;
    }
    private int calcularProximoDia(Long usuarioId, Rutina rutina) {
        RegistroEntrenamiento ultimoRegistro = registroRepository
                .findTopByUsuarioIdAndRutinaIdOrderByFechaCompletadoDesc(usuarioId, rutina.getId())
                .orElse(null);

        // Si nunca entrenó esta rutina, empieza por el día 0
        if (ultimoRegistro == null || ultimoRegistro.getDiaRutina() == null) {
            return 0;
        }

        List<DiaRutina> dias = rutina.getDiasRutina();
        for (int i = 0; i < dias.size(); i++) {
            if (dias.get(i).getId().equals(ultimoRegistro.getDiaRutina().getId())) {
                int proximo = i + 1; // Siguiente día
                return proximo >= dias.size() ? 0 : proximo; // Si terminó la rutina, reinicia a 0
            }
        }
        return 0;
    }
}
