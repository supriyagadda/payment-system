package com.payments.systems.model;


import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DeleteCard {
    private int userid;
    private int cardid;
}
