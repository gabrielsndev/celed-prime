package com.celedprime.api.repository;

import com.celedprime.api.model.Reservation;
import com.celedprime.api.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Optional;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    public Optional<Reservation> findByDate(LocalDate date);

}
