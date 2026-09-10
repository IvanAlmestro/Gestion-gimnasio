package gim.microservicio.repository;

import gim.microservicio.entity.HistorialPeso;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HistorialPesoRepository extends JpaRepository<HistorialPeso, Long> {

    List<HistorialPeso> findByPersonaIdOrderByFechaAsc(Long personaId);
}
