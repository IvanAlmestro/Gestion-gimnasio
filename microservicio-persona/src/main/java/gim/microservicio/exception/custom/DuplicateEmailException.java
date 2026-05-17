package gim.microservicio.exception.custom;

import org.springframework.http.HttpStatus;

public class DuplicateEmailException extends BusinessException{

    public DuplicateEmailException(String mensaje){
        super(mensaje, HttpStatus.CONFLICT);
    }
}
