package gim.microservicio.exception.handler;
import gim.microservicio.exception.custom.BusinessException;
import gim.microservicio.exception.response.ApiError;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<ApiError> manejarBusinessException(BusinessException ex){

        ApiError error = new ApiError(
                LocalDateTime.now(),
                ex.getStatus().value(),
                ex.getStatus().name(),
                ex.getMessage()
        );

        return ResponseEntity.status(ex.getStatus()).body(error);
    }

}