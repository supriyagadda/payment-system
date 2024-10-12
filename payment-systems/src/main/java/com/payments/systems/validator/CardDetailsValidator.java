package com.payments.systems.validator;


import com.payments.systems.exception.BaseException;
import com.payments.systems.model.CardDetails;
import com.payments.systems.repository.CardDetailsRepository;
import com.payments.systems.util.CommonUtil;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import java.util.Objects;

@Component
public class CardDetailsValidator {

    private final CardDetailsRepository cardDetailsRepository;

    public CardDetailsValidator(CardDetailsRepository cardDetailsRepository) {
        this.cardDetailsRepository = cardDetailsRepository;
    }


    public void checkIfCardAlreadyRegistered(CardDetails request){
        CardDetails cardDetails = cardDetailsRepository.findByCardNumberAndUserID(request.getCardnumber(), request.getUserid());
        if(Objects.nonNull(cardDetails)){
            throw new BaseException(CommonUtil.buildOutputMetadata(HttpStatus.BAD_REQUEST.name(), "Card Already registered."));
        }
    }

}
