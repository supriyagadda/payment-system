package com.payments.systems.model;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginRequest {
    @NotNull(message = "emailid is required.")
    @NotEmpty (message = "Emaild should be provided.")
    private String emailid;
    @NotNull(message = "password is required.")
    @NotEmpty(message = "password should be there.")
    private String password;
}
