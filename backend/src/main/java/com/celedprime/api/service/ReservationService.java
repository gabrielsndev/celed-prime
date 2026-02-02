package com.celedprime.api.service;

import com.celedprime.api.dto.ReservationRequestDTO;
import com.celedprime.api.dto.ReservationResponseDTO;
import com.celedprime.api.mapper.ReservationMapper;
import com.celedprime.api.model.Reservation;
import com.celedprime.api.model.User;
import com.celedprime.api.repository.ReservationRepository;
import org.springframework.stereotype.Service;
import com.celedprime.api.exception.BusinessException;

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
        return reservation.isPresent();
    }

    public ReservationResponseDTO create(ReservationRequestDTO request) {
        LocalDate date = request.date();
        if(checkAvailability(date)) {
            throw new BusinessExexeption("Há agendamento no dia selecionado");
        }

        User user = userService.findEntityById(request.userId());
        Reservation reserve = ReservationMapper.toEntity(request, user);

        this.repository.save(reserve);
        return  ReservationMapper.toResponse(reserve);
    }

//    public ReservationResponseDTO editDate(Reservation)
    public List<ReservationResponseDTO> findAllByUser(Long userId) {

        User user = userService.findEntityById(userId);
        List<Reservation> reservations = this.repository.findByUser(user);
        List<ReservationResponseDTO> reserves = new ArrayList<>();

        for(Reservation reserve: reservations) {
            reserves.add(ReservationMapper.toResponse(reserve));
        }

        return reserves;
    }

}
