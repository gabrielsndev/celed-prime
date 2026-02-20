package com.celedprime.api.dto;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record ReservationRequestDTO(
    @NotNull(message = "A data da reserva é obrigatória")
    @FutureOrPresent(message = "A data não pode ser no passado")
    LocalDate date
) {}
