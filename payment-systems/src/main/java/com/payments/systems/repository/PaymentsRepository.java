package com.payments.systems.repository;


import com.payments.systems.model.Payment;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentsRepository extends CrudRepository<Payment, Long> {
    Payment save(Payment payment);
}
