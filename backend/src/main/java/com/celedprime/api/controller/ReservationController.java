package com.celedprime.api.controller;

import com.celedprime.api.dto.ReservationRequestDTO;
import com.celedprime.api.dto.ReservationResponseDTO;
import com.celedprime.api.model.User;
import com.celedprime.api.service.ReservationService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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
    public ResponseEntity<ReservationResponseDTO> create(@RequestBody @Valid ReservationRequestDTO request,
            @AuthenticationPrincipal User user,
            UriComponentsBuilder uriBuilder) {
        ReservationResponseDTO response = this.service.create(request, user.getId());
        URI uri = uriBuilder.path("reserve/{id}").buildAndExpand(response.id()).toUri();
        return ResponseEntity.created(uri).body(response);
    }

    @DeleteMapping("/admin/{id}") // delete
    public ResponseEntity<Void> adminDelete(@PathVariable Long id) {
        this.service.adminSoftDeleteReservation(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/my")
    public ResponseEntity<List<ReservationResponseDTO>> listMyReservations(@AuthenticationPrincipal User user) {
        List<ReservationResponseDTO> reservesUser = this.service.findAllByUser(user.getId());
        return ResponseEntity.ok(reservesUser);
    }

    @GetMapping("/calendar")
    public ResponseEntity<List<ReservationResponseDTO>> findByMonth(@RequestParam int month, @RequestParam int year) {
        List<ReservationResponseDTO> response = service.findByMonth(month, year);
        return ResponseEntity.ok(response);
    }

}
