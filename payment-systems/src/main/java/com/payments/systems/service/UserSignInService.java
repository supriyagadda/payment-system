package com.payments.systems.service;


import com.payments.systems.model.*;
import com.payments.systems.repository.UserDetailsRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class UserSignInService {

    private final UserDetailsRepository userDetailsRepository;
    public UserSignInService(UserDetailsRepository userDetailsRepository) {
    this.userDetailsRepository = userDetailsRepository;
    }


    public ResponseEntity<User> signInUser(User request) {
        request.setStatusid(Status.ACTIVE.getCode());
        User user = userDetailsRepository.save(request);
        if (Objects.nonNull(user)) {
            return ResponseEntity.ok(user);
        }

        return  ResponseEntity.badRequest().build();

                    //    CommonUtil.buildOutputMetadata(HttpStatus.BAD_REQUEST.name(), "User registration is unsuccessfull.")))

    }

    public ResponseEntity<User> loginUser(LoginRequest request){
        User user = userDetailsRepository.findByEmailidAndPassword(request.getEmailid(), request.getPassword());
        if (Objects.nonNull(user)) {
           // return ResponseEntity.ok(CommonUtil.buildOutputMetadata(HttpStatus.OK.name(), "User Successfully LoggedIn."));
            return ResponseEntity.ok(user);
        }
       // return  ResponseEntity.badRequest().body(CommonUtil.buildOutputMetadata(HttpStatus.BAD_REQUEST.name(), "Invalid email or password."));
    return ResponseEntity.badRequest().build();
    }

}
