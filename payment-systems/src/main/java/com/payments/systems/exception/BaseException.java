package com.payments.systems.exception;

import com.payments.systems.model.OutputMetaData;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BaseException extends RuntimeException {
    private final OutputMetaData outputMetaData;

    public BaseException(OutputMetaData outputMetaData) {
        this.outputMetaData = outputMetaData;
    }
}