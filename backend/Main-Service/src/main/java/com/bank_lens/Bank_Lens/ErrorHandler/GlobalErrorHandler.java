package com.bank_lens.Bank_Lens.ErrorHandler;

import com.bank_lens.Bank_Lens.Error.ModelFailedException;
import com.bank_lens.Bank_Lens.Error.RError;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalErrorHandler {
    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<RError> entityNotFoundException(EntityNotFoundException exception){
        Map<String,String> errors = new HashMap<>();
        errors.put("message",exception.getMessage());
        return ResponseEntity.status(404).body(new RError(errors));
    }

    @ExceptionHandler(ModelFailedException.class)
    public ResponseEntity<RError> modelFailedException(ModelFailedException exception){
        Map<String,String> errors = new HashMap<>();
        errors.put("message",exception.getMessage());
        return ResponseEntity.status(500).body(new RError(errors));
    }
}
