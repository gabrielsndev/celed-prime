package com.celedprime.api.service;

import com.celedprime.api.dto.ReservationRequestDTO;
import com.celedprime.api.dto.ReservationResponseDTO;
import com.celedprime.api.mapper.ReservationMapper;
import com.celedprime.api.model.Reservation;
import com.celedprime.api.model.User;
import com.celedprime.api.model.enums.ReservationStatus;
import com.celedprime.api.repository.ReservationRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import com.celedprime.api.infra.exception.BusinessException;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ReservationService {
    private final ReservationRepository repository;
    private final UserService userService;

    public ReservationService(ReservationRepository repository, UserService userService) {
        this.repository = repository;
        this.userService = userService;
    }

    public boolean checkAvailability(LocalDate date) {
        Optional<Reservation> reservation = this.repository.findByDate(date);
        return reservation.isPresent() && reservation.get().getStatus() != ReservationStatus.CANCELED;
    }

    public ReservationResponseDTO create(ReservationRequestDTO request, Long userId) {
        LocalDate date = request.date();
        if(checkAvailability(date)) {
            throw new BusinessException("Há agendamento no dia selecionado");
        }

        User user = userService.findEntityById(userId);
        Reservation reserve = ReservationMapper.toEntity(request, user);

        this.repository.save(reserve);
        return ReservationMapper.toResponse(reserve);
    }

    public List<ReservationResponseDTO> findAllByUser(Long userId) {

        User user = userService.findEntityById(userId);
        List<Reservation> reservations = this.repository.findByUser(user);
        List<ReservationResponseDTO> reserves = new ArrayList<>();

        for(Reservation reserve: reservations) {
            reserves.add(ReservationMapper.toResponse(reserve));
        }

        return reserves;
    }

    @Transactional
    public void adminSoftDeleteReservation(Long id) {
        Reservation reservation = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Reserva não encontrada: " + id));

        reservation.setStatus(ReservationStatus.CANCELED);
        repository.save(reservation);
    }

    public List<ReservationResponseDTO> findByMonth(int month, int year) {

        LocalDate startDate = LocalDate.of(year, month, 1);
        LocalDate endDate = startDate.with(java.time.temporal.TemporalAdjusters.lastDayOfMonth());

        List<Reservation> reservations = repository.findByDateBetween(startDate, endDate);
        List<ReservationResponseDTO> response = new ArrayList<>();

        for(Reservation reserve: reservations) {
            response.add(ReservationMapper.toResponse(reserve));
        }
        return response;
    }
}
