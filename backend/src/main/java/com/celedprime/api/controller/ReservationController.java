package com.celedprime.api.controller;

import com.celedprime.api.dto.ReservationRequestDTO;
import com.celedprime.api.dto.ReservationResponseDTO;
import com.celedprime.api.service.ReservationService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/reserve")
public class ReservationController {

    private final ReservationService service;

    public ReservationController(ReservationService service) {
        this.service = service;
    }

    @PostMapping("/create")
    public ResponseEntity<ReservationResponseDTO> create(@RequestBody @Valid ReservationRequestDTO request, UriComponentsBuilder uriBuilder) {
        ReservationResponseDTO response = this.service.create(request);
        URI uri = uriBuilder.path("reserve/{id}").buildAndExpand(response.id()).toUri();
        return ResponseEntity.created(uri).body(response);
    }

    @DeleteMapping("/admin/{id}")
    public ResponseEntity<Void> adminDelete(@PathVariable Long id) {
        this.service.adminSoftDeleteReservation(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/list/user/{id}")
    public ResponseEntity<List<ReservationResponseDTO>> listForUser(@PathVariable Long id) {
        List<ReservationResponseDTO> reservesUser =this.service.findAllByUser(id);
        return ResponseEntity.ok(reservesUser);
    }

}
