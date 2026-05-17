package gim.microservicio.exception.custom;

import org.springframework.http.HttpStatus;

public class RutinaNotFoundException extends BusinessException{

    public RutinaNotFoundException(String mensaje){
        super(mensaje, HttpStatus.NOT_FOUND);
    }
}
