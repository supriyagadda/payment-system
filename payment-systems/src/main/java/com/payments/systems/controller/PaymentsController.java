package com.payments.systems.controller;


import com.payments.systems.model.OutputMetaData;
import com.payments.systems.model.Payment;
import com.payments.systems.service.PaymentsService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
public class PaymentsController {
    private final PaymentsService paymentsService;

    public PaymentsController(PaymentsService paymentsService) {
        this.paymentsService = paymentsService;
    }


    @PostMapping("/pay")
    public ResponseEntity<OutputMetaData> pay(@Valid @RequestBody Payment request) {
        return paymentsService.doPayment(request);
    }

}
