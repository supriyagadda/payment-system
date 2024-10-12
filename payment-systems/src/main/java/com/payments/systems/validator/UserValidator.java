package com.payments.systems.validator;

import com.payments.systems.exception.BaseException;
import com.payments.systems.model.User;
import com.payments.systems.repository.UserDetailsRepository;
import com.payments.systems.util.CommonUtil;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import java.util.Objects;

@Component
public class UserValidator {
    private final UserDetailsRepository userDetailsRepository;

    public UserValidator(UserDetailsRepository userDetailsRepository) {
        this.userDetailsRepository = userDetailsRepository;
    }


    public void isUserAlreadyExisted(User request){
        User user = userDetailsRepository.findByEmailid(request.getEmailid());
        if(Objects.nonNull(user)){
              throw new BaseException(CommonUtil.buildOutputMetadata(HttpStatus.BAD_REQUEST.name(), "User Already registered with the provided email."));
        }
    }

    public void checkIfUserAvailable(int userid){
        User user = userDetailsRepository.findByUserid(userid);
        if(Objects.isNull(user)){
            throw new BaseException(CommonUtil.buildOutputMetadata(HttpStatus.BAD_REQUEST.name(), "User is not available."));
        }
    }

}
