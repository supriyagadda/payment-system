package com.payments.systems.controller;


import com.payments.systems.exception.BaseException;
import com.payments.systems.model.CardDetails;
import com.payments.systems.model.OutputMetaData;
import com.payments.systems.model.Payment;
import com.payments.systems.model.TransactionDetails;
import com.payments.systems.repository.CardDetailsRepository;
import com.payments.systems.service.PaymentsService;
import com.payments.systems.util.CommonUtil;
import com.payments.systems.validator.CardDetailsValidator;
import com.payments.systems.validator.UserValidator;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
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
    private final CardDetailsRepository cardDetailsRepository;

    public PaymentsController(UserValidator userValidator, PaymentsService paymentsService, CardDetailsRepository cardDetailsRepository) {
        this.userValidator = userValidator;
        this.paymentsService = paymentsService;
        this.cardDetailsRepository = cardDetailsRepository;
    }


    @PostMapping("/pay")
    public ResponseEntity<OutputMetaData> pay(@Valid @RequestBody Payment request) {
        if(Objects.nonNull(request.getTransactionTime())){
            request.setTransactionTime(LocalDateTime.now());
        }
        userValidator.checkIfUserAvailable(request.getUserid());
        CardDetails cardDetails = cardDetailsRepository.findByCardidAndUserid(request.getCardid(), request.getUserid());
        if(Objects.isNull(cardDetails)){
            throw new BaseException(CommonUtil.buildOutputMetadata(HttpStatus.BAD_REQUEST.name(), "Invalid details provided."));
        }
        return paymentsService.doPayment(request);
    }

    @GetMapping("/transactiondetails")
    public ResponseEntity<List<TransactionDetails>> getTransactionDetails(@Valid @RequestParam("userid") int userid) {
        userValidator.checkIfUserAvailable(userid);
       return paymentsService.transactionDetails(userid);
    }

}
