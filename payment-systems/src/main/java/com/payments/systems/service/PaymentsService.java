package com.payments.systems.service;

import com.payments.systems.model.OutputMetaData;
import com.payments.systems.model.Payment;
import com.payments.systems.model.TransactionDetails;
import com.payments.systems.repository.PaymentsRepository;
import com.payments.systems.util.CommonUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentsService {
    private final PaymentsRepository paymentsRepository;

    public PaymentsService(PaymentsRepository paymentsRepository) {
        this.paymentsRepository = paymentsRepository;
    }

    public ResponseEntity<OutputMetaData> doPayment(Payment request){
        Payment payment = paymentsRepository.save(request);
        return ResponseEntity.ok(CommonUtil.buildOutputMetadata(HttpStatus.OK.name(), "Paid SuccessFully."));
    }

    public ResponseEntity<List<TransactionDetails>> transactionDetails(int userId) {
     //   List<TransactionDetails> transactionDetails = paymentsRepository.findTransactionDetailsByUserId(userId);
      //  return ResponseEntity.ok(transactionDetails);
        return null;
    }

}
