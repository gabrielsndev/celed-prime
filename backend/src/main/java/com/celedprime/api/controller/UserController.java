package com.celedprime.api.controller;

import com.celedprime.api.dto.LoginRequestDTO;
import com.celedprime.api.dto.UserRegistrationDTO;
import com.celedprime.api.dto.UserResponseDTO;
import com.celedprime.api.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService service;

    public UserController(UserService servico) {
        this.service = servico;
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponseDTO> register(@RequestBody @Valid UserRegistrationDTO request, UriComponentsBuilder uriBuilder) {
        UserResponseDTO response = this.service.create(request);
        URI uri = uriBuilder.path("/users/{id}").buildAndExpand(response.id()).toUri();
        return ResponseEntity.created(uri).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<UserResponseDTO> login(@RequestBody @Valid LoginRequestDTO request) {
        UserResponseDTO user = this.service.login(request);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDTO> findById(@PathVariable Long id) {
        UserResponseDTO response = service.findById(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<UserResponseDTO>> getAll() {
        List<UserResponseDTO> users = this.service.findAll();
        return ResponseEntity.ok(users);
    }

}
