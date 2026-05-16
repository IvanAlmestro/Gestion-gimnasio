package gim.microservicio.repository;

import gim.microservicio.entity.Rutina;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;


public interface RutinaRepository  extends JpaRepository<Rutina, Long> {

    Optional<Rutina> findBy(String email);
    boolean existsBy(String email);
    boolean existsByNombreAndIdUsuario(String nombre, Long idUsuario);

    List<Rutina> findByIdUsuario(Long idUsuario);
}
