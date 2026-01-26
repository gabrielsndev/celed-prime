package com.celedprime.api.dto;

import com.celedprime.api.model.enums.ReservationStatus;

import java.time.LocalDate;

public record ReservationResponseDTO(
    Long id,
    LocalDate date,
    UserResponseDTO user,
    ReservationStatus status
) {}
