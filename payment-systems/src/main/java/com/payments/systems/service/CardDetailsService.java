package com.payments.systems.service;


import com.payments.systems.model.CardDetails;
import com.payments.systems.model.DeleteCard;
import com.payments.systems.model.OutputMetaData;
import com.payments.systems.repository.CardDetailsRepository;
import com.payments.systems.util.CommonUtil;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.List;
import java.util.Objects;

@Service
public class CardDetailsService {
    private final CardDetailsRepository cardDetailsRepository;

    public CardDetailsService(CardDetailsRepository cardDetailsRepository) {
        this.cardDetailsRepository = cardDetailsRepository;
    }

    public ResponseEntity<OutputMetaData> saveCard(CardDetails request){
        CardDetails cardDetails = cardDetailsRepository.save(request);
        if(Objects.nonNull(cardDetails)){
            return ResponseEntity.ok(CommonUtil.buildOutputMetadata(HttpStatus.OK.name(), "Card Successfully Registered."));
        }
        return  ResponseEntity.badRequest().body(CommonUtil.buildOutputMetadata(HttpStatus.BAD_REQUEST.name(), "Card registration is unsuccessfull."));
    }


    public ResponseEntity<List<CardDetails>> getAllCardOfAnUser(int userid) {
        List<CardDetails> cardDetailsList = cardDetailsRepository.findByUserid(userid);
        return ResponseEntity.ok(cardDetailsList);
    }

    public ResponseEntity<OutputMetaData> deleteCard(@Valid DeleteCard request) {
        cardDetailsRepository.deleteByCardidAndUserid(request.getCardid(), request.getUserid());
        return ResponseEntity.ok(OutputMetaData.builder().respCode(HttpStatus.OK.name()).respMessage("Successfully deleted the card.").build());
    }
}
