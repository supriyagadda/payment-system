package com.payments.systems.controller;


import com.payments.systems.exception.BaseException;
import com.payments.systems.model.CardDetails;
import com.payments.systems.model.DeleteCard;
import com.payments.systems.model.OutputMetaData;
import com.payments.systems.repository.CardDetailsRepository;
import com.payments.systems.service.CardDetailsService;
import com.payments.systems.util.CommonUtil;
import com.payments.systems.validator.CardDetailsValidator;
import com.payments.systems.validator.UserValidator;
import jakarta.validation.Valid;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;
import java.util.Random;

@RestController
@CrossOrigin(origins = "*")
public class CardDetailsController {
    private final CardDetailsService cardDetailsService;
    private final CardDetailsValidator cardDetailsValidator;
    private final UserValidator userValidator;
    private final CardDetailsRepository cardDetailsRepository;

    public CardDetailsController(CardDetailsService cardDetailsService, CardDetailsValidator cardDetailsValidator, UserValidator userValidator, CardDetailsRepository cardDetailsRepository) {
        this.cardDetailsService = cardDetailsService;
        this.cardDetailsValidator = cardDetailsValidator;
        this.userValidator = userValidator;
        this.cardDetailsRepository = cardDetailsRepository;
    }

    @PostMapping("/card-register")
    public ResponseEntity<OutputMetaData> registerCard(@Valid @RequestBody CardDetails cardDetails) {
        cardDetailsValidator.checkIfCardAlreadyRegistered(cardDetails);
        cardDetails.setCardid(new Random().nextInt(1,1000));
        return cardDetailsService.saveCard(cardDetails);
    }

    @GetMapping("/getcards")
    public ResponseEntity<List<CardDetails>> getCardDetails(@Valid @RequestParam("userid") int userid) {
       userValidator.checkIfUserAvailable(userid);
       return cardDetailsService.getAllCardOfAnUser(userid);
    }

    @PostMapping("/deletecard")
    public  ResponseEntity<OutputMetaData>  deleteCard(@Valid @RequestBody DeleteCard request){
        userValidator.checkIfUserAvailable(request.getUserid());
        userValidator.checkIfUserAvailable(request.getUserid());
        CardDetails cardDetails = cardDetailsRepository.findByCardidAndUserid(request.getCardid(), request.getUserid());
        if(Objects.isNull(cardDetails)){
            throw new BaseException(CommonUtil.buildOutputMetadata(HttpStatus.BAD_REQUEST.name(), "Invalid details provided."));
        }
        return cardDetailsService.deleteCard(request);
    }

}


