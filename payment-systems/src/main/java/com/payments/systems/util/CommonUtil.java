package com.payments.systems.util;

import com.payments.systems.model.OutputMetaData;

public class CommonUtil {

    public static OutputMetaData buildOutputMetadata(String respCode, String respMessage){
        return OutputMetaData.builder()
                .respCode(respCode)
                .respMessage(respMessage)
                .build();
    }
}
