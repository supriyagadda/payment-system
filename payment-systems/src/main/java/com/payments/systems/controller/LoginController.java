package com.payments.systems.controller;


import com.payments.systems.model.LoginRequest;
import com.payments.systems.model.User;
import com.payments.systems.service.UserSignInService;
import com.payments.systems.validator.UserValidator;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

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
    return userSignInService.signInUser(user);
    }

    }
