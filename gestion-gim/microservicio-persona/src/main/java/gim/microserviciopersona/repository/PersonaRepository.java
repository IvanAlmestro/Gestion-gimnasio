package gim.microserviciopersona.repository;

import gim.microserviciopersona.entity.Persona;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;


public interface PersonaRepository  extends JpaRepository<Persona, Long> {

    Optional<Persona> findPersonaByEmail(String email);
    boolean existsByEmail(String email);
    
}
