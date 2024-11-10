package com.payments.systems.controller;


import com.payments.systems.model.CardDetails;
import com.payments.systems.model.OutputMetaData;
import com.payments.systems.service.CardDetailsService;
import com.payments.systems.validator.CardDetailsValidator;
import com.payments.systems.validator.UserValidator;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class CardDetailsController {
    private final CardDetailsService cardDetailsService;
    private final CardDetailsValidator cardDetailsValidator;
    private final UserValidator userValidator;

    public CardDetailsController(CardDetailsService cardDetailsService, CardDetailsValidator cardDetailsValidator, UserValidator userValidator) {
        this.cardDetailsService = cardDetailsService;
        this.cardDetailsValidator = cardDetailsValidator;
        this.userValidator = userValidator;
    }

    @PostMapping("/card-register")
    public ResponseEntity<OutputMetaData> registerCard(@Valid @RequestBody CardDetails cardDetails) {
        cardDetailsValidator.checkIfCardAlreadyRegistered(cardDetails);
        return cardDetailsService.saveCard(cardDetails);
    }

    @GetMapping("/getcards")
    public ResponseEntity<List<CardDetails>> getCardDetails(@Valid @RequestParam("userid") int userid) {
       userValidator.checkIfUserAvailable(userid);
       return cardDetailsService.getAllCardOfAnUser(userid);
    }

}


