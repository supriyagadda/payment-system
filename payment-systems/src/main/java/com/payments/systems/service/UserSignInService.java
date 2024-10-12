package com.payments.systems.service;


import com.payments.systems.model.LoginRequest;
import com.payments.systems.model.OutputMetaData;
import com.payments.systems.model.Status;
import com.payments.systems.model.User;
import com.payments.systems.repository.UserDetailsRepository;
import com.payments.systems.util.CommonUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class UserSignInService {

    private final UserDetailsRepository userDetailsRepository;
    public UserSignInService(UserDetailsRepository userDetailsRepository) {
    this.userDetailsRepository = userDetailsRepository;
    }


    public ResponseEntity<OutputMetaData> signInUser(User request) {
        request.setStatusid(Status.ACTIVE.getCode());
        User user = userDetailsRepository.save(request);
        if (Objects.nonNull(user)) {
            return ResponseEntity.ok(CommonUtil.buildOutputMetadata(HttpStatus.OK.name(), "User Successfully Registered."));
        }
        return  ResponseEntity.badRequest().body(CommonUtil.buildOutputMetadata(HttpStatus.BAD_REQUEST.name(), "User registration is unsuccessfull."));
    }

    public ResponseEntity<OutputMetaData> loginUser(LoginRequest request){
        User user = userDetailsRepository.findByEmailidAndPassword(request.getEmailid(), request.getPassword());
        if (Objects.nonNull(user)) {
            return ResponseEntity.ok(CommonUtil.buildOutputMetadata(HttpStatus.OK.name(), "User Successfully LoggedIn."));
        }
        return  ResponseEntity.badRequest().body(CommonUtil.buildOutputMetadata(HttpStatus.BAD_REQUEST.name(), "Invalid email or password."));
    }

}
