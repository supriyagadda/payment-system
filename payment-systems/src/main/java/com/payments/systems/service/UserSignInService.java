package com.payments.systems.service;


import com.payments.systems.exception.BaseException;
import com.payments.systems.model.*;
import com.payments.systems.repository.UserDetailsRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

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

    public ResponseEntity<User> updateUser(User user) {
        User existingUserDetails = userDetailsRepository.getUserByUserid(user.getUserid());
        if(Objects.isNull(existingUserDetails)){
            throw new BaseException(OutputMetaData.builder().respMessage("User is not available.").respCode(HttpStatus.BAD_REQUEST.name()).build());
        }
        if(Objects.nonNull(user.getLastname())) {
            existingUserDetails.setLastname(user.getLastname());
        }if (Objects.nonNull(user.getFirstname())){
            existingUserDetails.setFirstname(user.getFirstname());
        }
        User updateUser = userDetailsRepository.save(existingUserDetails);
        updateUser.setPassword(null);
        return ResponseEntity.ok(updateUser);
    }
}
