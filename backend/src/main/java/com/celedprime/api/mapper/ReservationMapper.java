package com.celedprime.api.mapper;

import com.celedprime.api.dto.ReservationRequestDTO;
import com.celedprime.api.dto.ReservationResponseDTO;
import com.celedprime.api.model.Reservation;
import com.celedprime.api.model.User;
import com.celedprime.api.model.enums.ReservationStatus;

public class ReservationMapper {

    public static Reservation toEntity(ReservationRequestDTO dto, User user) {
        Reservation reservation = new Reservation();
        reservation.setDate(dto.date());
        reservation.setUser(user);
        reservation.setStatus(ReservationStatus.CONFIRMED);
        return reservation;
    }

    public static ReservationResponseDTO toResponse(Reservation reservation) {
        return new ReservationResponseDTO(
                reservation.getId(),
                reservation.getDate(),
                UserMapper.toResponse(reservation.getUser()),
                reservation.getStatus()
        );
    }
}
