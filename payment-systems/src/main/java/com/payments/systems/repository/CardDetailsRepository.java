package com.payments.systems.repository;


import com.payments.systems.model.CardDetails;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CardDetailsRepository extends CrudRepository<CardDetails, Long> {
    CardDetails save(CardDetails cardDetails);
    CardDetails findByCardNumberAndUserID(String cardnumber, int userid);
    List<CardDetails> findByUserid(int userid);
}
