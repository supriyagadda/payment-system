package com.payments.systems.repository;


import com.payments.systems.model.User;
import jakarta.validation.Valid;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDetailsRepository extends JpaRepository<User,Long> {

    User save(User user);

    User findByEmailid(String emailid);

    User findByUserid(int userid);

    User findByEmailidAndPassword(String emailid, String password);

   // User sa(User user);

    User getUserByUserid(int userid);
}
