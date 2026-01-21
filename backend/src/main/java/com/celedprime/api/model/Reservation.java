package com.celedprime.api.model;
import com.celedprime.api.model.enums.ReservationStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity @Table(name = "reservations")
@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
public class Reservation {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private LocalDate date;

    @Column(nullable = false)
    private LocalDate created;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ReservationStatus status;

    @Column(columnDefinition = "TEXT")
    private String observations;

    @PrePersist
    protected void onCreate() {
        this.created = LocalDate.now();
        if (this.status == null) {
            this.status = ReservationStatus.PENDING;
        }
    }
}
