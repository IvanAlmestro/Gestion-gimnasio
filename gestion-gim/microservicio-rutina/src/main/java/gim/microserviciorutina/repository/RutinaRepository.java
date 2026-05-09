package gim.microserviciorutina.repository;

import gim.microserviciorutina.entity.Rutina;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface RutinaRepository  extends JpaRepository<Rutina, Long> {

    Optional<Rutina> findBy(String email);
    boolean existsBy(String email);
    boolean existsByNombreAndIdUsuario(String nombre, Long idUsuario);
    
}
