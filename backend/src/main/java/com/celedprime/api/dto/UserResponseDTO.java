package com.celedprime.api.dto;

import com.celedprime.api.model.enums.UserRole;

public record UserResponseDTO(
    Long id,
    String name,
    String email,
    String phone,
    UserRole role
) {}
