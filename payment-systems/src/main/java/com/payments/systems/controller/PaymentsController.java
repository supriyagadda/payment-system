package com.payments.systems.controller;


import com.payments.systems.model.CardDetails;
import com.payments.systems.model.OutputMetaData;
import com.payments.systems.model.Payment;
import com.payments.systems.model.TransactionDetails;
import com.payments.systems.service.PaymentsService;
import com.payments.systems.validator.UserValidator;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@RestController
@CrossOrigin(origins = "*")
public class PaymentsController {

    private final UserValidator userValidator;
    private final PaymentsService paymentsService;

    public PaymentsController(UserValidator userValidator, PaymentsService paymentsService) {
        this.userValidator = userValidator;
        this.paymentsService = paymentsService;
    }


    @PostMapping("/pay")
    public ResponseEntity<OutputMetaData> pay(@Valid @RequestBody Payment request) {
        if(Objects.nonNull(request.getTransactionTime())){
            request.setTransactionTime(LocalDateTime.now());
        }
        return paymentsService.doPayment(request);
    }

    @GetMapping("/transactiondetails")
    public ResponseEntity<List<TransactionDetails>> getTransactionDetails(@Valid @RequestParam("userid") int userid) {
        userValidator.checkIfUserAvailable(userid);
       return paymentsService.transactionDetails(userid);
    }

}
