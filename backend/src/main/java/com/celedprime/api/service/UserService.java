package com.celedprime.api.service;

import com.celedprime.api.dto.LoginRequestDTO;
import com.celedprime.api.dto.UserRegistrationDTO;
import com.celedprime.api.dto.UserResponseDTO;
import com.celedprime.api.mapper.UserMapper;
import com.celedprime.api.model.User;
import com.celedprime.api.model.enums.UserRole;
import com.celedprime.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.celedprime.api.infra.exception.BusinessException;
import com.celedprime.api.infra.exception.ResourceNotFoundException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository repository, PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    public UserResponseDTO create(UserRegistrationDTO userDTO) {

        if(repository.findByEmail(userDTO.email()).isPresent()) {
            throw new BusinessException("Email já cadastrado!");
        }

        String encryptedPassword = passwordEncoder.encode(userDTO.password());

        User newUser = UserMapper.toEntity(userDTO);
        newUser.setPassword(encryptedPassword);
        User userSaved = repository.save(newUser);

        return UserMapper.toResponse(userSaved);
    }

    public UserResponseDTO login(LoginRequestDTO userDTO) {
        User user = repository.findByEmail(userDTO.email())
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado"));

        if(!passwordEncoder.matches(userDTO.password(), user.getPassword())) {
            throw new BusinessException("Senha incorreta");
        }

        return UserMapper.toResponse(user);
    }

    public UserResponseDTO findById(Long id) {

        Optional<User> userOptional = repository.findById(id);

        if (userOptional.isEmpty()) {
            throw new ResourceNotFoundException("Usuário com ID " + id + " não foi encontrado.");
        }

        User user = userOptional.get();
        return UserMapper.toResponse(user);
    }

    public User findEntityById(Long id) {

        Optional<User> userOptional = repository.findById(id);

        if (userOptional.isEmpty()) {
            throw new ResourceNotFoundException("Usuário com ID " + id + " não foi encontrado.");
        }

        return userOptional.get();

    }

    public List<UserResponseDTO> findAll() {

        List<User> userList = repository.findAll();
        List<UserResponseDTO> dtoList = new ArrayList<>();

        for (User user : userList) {
            dtoList.add(UserMapper.toResponse(user));
        }
        return dtoList;
    }

}
