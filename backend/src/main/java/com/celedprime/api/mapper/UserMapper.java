package com.celedprime.api.mapper;

import com.celedprime.api.dto.UserRegistrationDTO;
import com.celedprime.api.dto.UserResponseDTO;
import com.celedprime.api.model.User;
import com.celedprime.api.model.enums.UserRole;

public class UserMapper {

    public static User toEntity(UserRegistrationDTO dto) {
        User user = new User();
        user.setName(dto.name());
        user.setEmail(dto.email());
        user.setPhone(dto.phone());
        user.setPassword(dto.password());
        user.setRole(UserRole.CLIENT);
        return user;
    }

    public static UserResponseDTO toResponse(User user) {
        return new UserResponseDTO(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getPhone(),
                user.getRole()
        );
    }

}
