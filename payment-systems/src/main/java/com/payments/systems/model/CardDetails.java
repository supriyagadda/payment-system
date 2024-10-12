package com.payments.systems.model;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

@Getter
@Setter
@Builder
@Entity
@Table(name = "carddetails")
public class CardDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Adjust this strategy if needed
    @Column(name = "cardid")
    private int cardid;
    @NotNull(message = "Cardnumber should not be null.")
    private String cardnumber;
    @NotNull(message = "CVV should not be null.")
    private int cvv;
    @NotNull(message = "Expiry date should not be null.")
    private String expirydate;
    @NotNull(message = "CardType should not be null.")
    private String cardtype;
    private int userid;
}
