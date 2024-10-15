package com.payments.systems.exception;


import com.payments.systems.model.OutputMetaData;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class PaymentSystemsControllerAdvise {

    @ExceptionHandler(BaseException.class)
    public ResponseEntity<OutputMetaData> handleBaseException(BaseException ex){
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getOutputMetaData());
    }


}
