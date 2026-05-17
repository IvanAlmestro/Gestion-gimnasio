package gim.microservicio.repository;

import gim.microservicio.entity.Rutina;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;


public interface RutinaRepository  extends JpaRepository<Rutina, Long> {


    List<Rutina> findByIdUsuario(Long idUsuario);
}
