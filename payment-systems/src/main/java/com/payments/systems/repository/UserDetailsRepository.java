package com.payments.systems.repository;


import com.payments.systems.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDetailsRepository extends CrudRepository<User,Long> {

    User save(User user);

    User findByEmailid(String emailid);

    User findByUserid(int userid);

    User findByEmailidAndPassword(String emailid, String password);

}
