package com.celedprime.api.dto;

import java.time.LocalDate;

public record ReservationResponseDTO(
    Long id,
    LocalDate date,
    UserResponseDTO user
) {}
