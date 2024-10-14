package com.payments.systems.model;


import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OutputMetaData {
    private String respCode;
    private String respMessage;
}
