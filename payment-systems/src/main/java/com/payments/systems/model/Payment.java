package com.payments.systems.model;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "payment")
public class Payment {
    @Id
   // @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-increment for paymentId
    private Integer paymentid;

    @Positive(message = "Amount should be there.")
    private BigDecimal amount;

    @NotNull(message = "Business should be present.")
    private BUSINESS businesstype; // Assuming you have a Business entity class

    private LocalDateTime transactionTime;

    private String paymentStatus;

    private int userid; // Assuming you have a UserDetails entity class

    private int cardid; // Assuming you have a CardDetails entity class
}
