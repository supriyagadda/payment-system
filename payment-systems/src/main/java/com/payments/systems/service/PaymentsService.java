package com.payments.systems.service;

import com.payments.systems.model.CardDetails;
import com.payments.systems.model.OutputMetaData;
import com.payments.systems.model.Payment;
import com.payments.systems.model.TransactionDetails;
import com.payments.systems.repository.CardDetailsRepository;
import com.payments.systems.repository.PaymentsRepository;
import com.payments.systems.util.CommonUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PaymentsService {
    private final PaymentsRepository paymentsRepository;
    private final CardDetailsRepository cardDetailsRepository;

    public PaymentsService(PaymentsRepository paymentsRepository, CardDetailsRepository cardDetailsRepository) {
        this.paymentsRepository = paymentsRepository;
        this.cardDetailsRepository = cardDetailsRepository;
    }

    public ResponseEntity<OutputMetaData> doPayment(Payment request){
        Payment payment = paymentsRepository.save(request);
        return ResponseEntity.ok(CommonUtil.buildOutputMetadata(HttpStatus.OK.name(), "Paid SuccessFully."));
    }

    public ResponseEntity<List<TransactionDetails>> transactionDetails(int userId) {
     //   List<TransactionDetails> transactionDetails = paymentsRepository.findTransactionDetailsByUserId(userId);
      //  return ResponseEntity.ok(transactionDetails);
        //return null;

        List<Payment> payments = paymentsRepository.findByUserid(userId);
        List<CardDetails> cardDetailsList = cardDetailsRepository.findByUserid(userId);

        List<TransactionDetails> transactionDetailsList = new ArrayList<>();

        for (Payment payment : payments) {
            for (CardDetails cardDetails : cardDetailsList) {
                if (cardDetails.getCardid() == payment.getCardid()) {
//                    TransactionDetails transactionDetails
//                    TransactionDetails transactionDetails = new TransactionDetails(
//                            payment.getAmount(),
//                            payment.getTransactionTime(),
//                            cardDetails.getCardnumber(),
//                            cardDetails.getCardtype(),
//                            payment.getBusinessid(),
//                            cardDetails.getCardholdername()
//                    );
                    transactionDetailsList.add(TransactionDetails.builder()
                                    .amount(payment.getAmount())
                                    .businessid(payment.getBusinessid())
                                    .cardType(cardDetails.getCardtype())
                                    .cardNumber(cardDetails.getCardnumber())
                                    .transactionTime(payment.getTransactionTime())
                                    .transactionid(payment.getPaymentid())
                            .build());
                }
            }
        }

        return ResponseEntity.ok().body(transactionDetailsList);

    }

}
