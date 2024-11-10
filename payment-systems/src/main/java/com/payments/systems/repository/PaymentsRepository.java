package com.payments.systems.repository;


import com.payments.systems.model.Payment;
import com.payments.systems.model.TransactionDetails;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentsRepository extends CrudRepository<Payment, Long> {
    Payment save(Payment payment);

    List<Payment> findByUserid(int userid);

//    @Query("SELECT new com.payments.systems.model.TransactionDetails(p.amount, p.transactionTime, c.cardnumber, c.cardtype, p.businessid) " +
//            "FROM payment p " +
//            "JOIN p.carddetails c " +
//            "WHERE p.userid = :userid")
//    List<TransactionDetails> findTransactionDetailsByUserId(@Param("userid") int userid);

}
