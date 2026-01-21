package com.celedprime.api.dto;

import com.celedprime.api.model.enums.UserRole;
import jakarta.validation.constraints.*;

public record UserRegistrationDTO(
    @NotBlank(message = "O nome é obrigatório")
    String name,

    @NotBlank(message = "O e-mail é obrigatório")
    @Email(message = "Formato de e-mail inválido")
    String email,

    @NotBlank(message = "A senha é obrigatória")
    @Size(min = 6, message = "A senha deve ter no mínimo 6 caracteres")
    String password,

    @NotBlank(message = "O telefone é obrigatório")
    @Pattern(regexp = "^\\([1-9]{2}\\) [9]{0,1}[6-9]{1}[0-9]{3}\\-[0-9]{4}$")
    String phone,

    @NotNull(message = "O nível de acesso é obrigatório")
    UserRole role
) {}
