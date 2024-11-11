package com.payments.systems.repository;


import com.payments.systems.model.CardDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface CardDetailsRepository extends JpaRepository<CardDetails, Long> {
    CardDetails save(CardDetails cardDetails);

    CardDetails findByCardnumberAndUserid(String cardnumber, int userid);

    List<CardDetails> findByUserid(int userid);

    CardDetails findByCardidAndUserid(int cardid, int userid);

    @Modifying
    @Transactional
    @Query("DELETE FROM CardDetails c WHERE c.cardid = :cardid AND c.userid = :userid")
    void deleteByCardidAndUserid(@Param("cardid") int cardid, @Param("userid") int userid);

}
