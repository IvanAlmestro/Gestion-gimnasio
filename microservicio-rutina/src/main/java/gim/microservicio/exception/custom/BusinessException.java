package gim.microservicio.exception.custom;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public abstract class BusinessException  extends RuntimeException{
    private final HttpStatus status;

    public BusinessException(String mensaje, HttpStatus status){
        super(mensaje);
        this.status = status;
    }
}
