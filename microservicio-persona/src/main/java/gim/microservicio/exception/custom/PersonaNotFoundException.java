package gim.microservicio.exception.custom;

import org.springframework.http.HttpStatus;

public class PersonaNotFoundException extends BusinessException{

    public PersonaNotFoundException(String mensaje){
        super(mensaje, HttpStatus.NOT_FOUND);
    }
}
