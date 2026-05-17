package gim.microservicio.exception.custom;

import org.springframework.http.HttpStatus;

public class InvalidCredentialsException extends BusinessException {

    public InvalidCredentialsException(String mensaje){
        super(mensaje, HttpStatus.UNAUTHORIZED);
    }
}
