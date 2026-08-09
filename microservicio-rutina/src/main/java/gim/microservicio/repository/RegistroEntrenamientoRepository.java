package gim.microservicio.repository;

import gim.microservicio.entity.RegistroEntrenamiento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RegistroEntrenamientoRepository extends JpaRepository<RegistroEntrenamiento, Long> {

    // Spring Data JPA hace la magia acá: esto te trae el último registro del usuario ordenado por fecha
    Optional<RegistroEntrenamiento> findFirstByUsuarioIdOrderByFechaCompletadoDesc(Long usuarioId);
}
