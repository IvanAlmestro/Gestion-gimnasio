package gim.microservicio.repository;

import gim.microservicio.entity.DiaRutina;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DiaRutinaRepository extends JpaRepository<DiaRutina, Long> {


}