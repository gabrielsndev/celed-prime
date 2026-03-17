package com.celedprime.api.controller;

import com.celedprime.api.dto.ReservationRequestDTO;
import com.celedprime.api.dto.ReservationResponseDTO;
import com.celedprime.api.model.User;
import com.celedprime.api.service.ReservationService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.time.LocalDate;
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
    public ResponseEntity<Page<ReservationResponseDTO>> listMyReservations(@AuthenticationPrincipal User user,
                       @PageableDefault(size = 10, sort = "date", direction = Sort.Direction.ASC)Pageable pageable) {
        return ResponseEntity.ok(this.service.findAllByUser(user.getId()));
    }

    @GetMapping("/availability")
    public ResponseEntity<List<LocalDate>> getPublicAvailability(
            @RequestParam(defaultValue = "4") int months
        ) {
        List<LocalDate> dates = service.getAvailabilityRange(months);
        return ResponseEntity.ok(dates);
    }

}
