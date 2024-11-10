package com.payments.systems.model;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;



@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TransactionDetails {
    private BigDecimal amount;
    private LocalDateTime transactionTime;
    private String cardNumber;
    private String cardType;
    private String businessid;
}
