package com.celedprime.api.repository;

import com.celedprime.api.model.Reservation;
import com.celedprime.api.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    Optional<Reservation> findByDate(LocalDate date);

    Page<Reservation> findByUser(User user, Pageable pageable);

    List<Reservation> findByDateBetween(LocalDate startDate, LocalDate endDate);

    List<Reservation> findAllByDateBetween(LocalDate start, LocalDate end);
}
