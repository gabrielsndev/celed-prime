package com.celedprime.api.repository;

import com.celedprime.api.model.Reservation;
import com.celedprime.api.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    public Optional<Reservation> findByDate(LocalDate date);

    public List<Reservation> findByUser(User user);

}
