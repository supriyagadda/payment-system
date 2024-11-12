package com.payments.systems.exception;


import com.payments.systems.model.OutputMetaData;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.naming.directory.InvalidAttributeIdentifierException;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class PaymentSystemsControllerAdvise {

    @ExceptionHandler(BaseException.class)
    public ResponseEntity<OutputMetaData> handleBaseException(BaseException ex){
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getOutputMetaData());
    }
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach(error -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(InvalidAttributeIdentifierException.class)
    public ResponseEntity<String> handleInvalidEnumValue(InvalidAttributeIdentifierException ex) {
        String invalidValue = ex.getMessage();  // The invalid enum value that was passed


        String errorMessage = "Invalid enum value '" + invalidValue + "' provided. " +
                "Valid values are: ELECTRICITY, DONATION, WIFI, PROPERTYTAX, CREDITCARD, MOBILE, CARINSURANCE, GAS.";

        return new ResponseEntity<>(errorMessage, HttpStatus.BAD_REQUEST);
    }
}
