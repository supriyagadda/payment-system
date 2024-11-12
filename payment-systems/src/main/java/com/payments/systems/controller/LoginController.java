package com.payments.systems.controller;


import com.payments.systems.exception.BaseException;
import com.payments.systems.model.LoginRequest;
import com.payments.systems.model.OutputMetaData;
import com.payments.systems.model.User;
import com.payments.systems.service.UserSignInService;
import com.payments.systems.validator.UserValidator;
import jakarta.validation.Valid;
import jdk.jfr.ContentType;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@RestController
@CrossOrigin(origins = "*")
public class LoginController {

    private final UserValidator userValidator;
    private final UserSignInService userSignInService;

    public LoginController(UserValidator userValidator, UserSignInService userSignInService) {
        this.userValidator = userValidator;
        this.userSignInService = userSignInService;
    }


    @PostMapping("/login")
    public ResponseEntity<User> loginUser(@Valid @RequestBody LoginRequest loginRequest) {
    return userSignInService.loginUser(loginRequest);
    }

    @PostMapping("/signup")
    public ResponseEntity<User> signup(@Valid @RequestBody User user) {
    userValidator.isUserAlreadyExisted(user);
        if(Objects.isNull(user.getPassword())){
            throw new BaseException(OutputMetaData.builder().respMessage("Password should be there").respCode(HttpStatus.BAD_REQUEST.name()).build());
        }
        if(Objects.isNull(user.getEmailid())){
            throw new BaseException(OutputMetaData.builder().respMessage("Email should be there").respCode(HttpStatus.BAD_REQUEST.name()).build());
        }
    return userSignInService.signInUser(user);
    }


    @PutMapping("/update")
    public ResponseEntity<User> updateUser(@Valid @RequestBody User user){

        return userSignInService.updateUser(user);
    }


    }
