import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { ReservationService } from '../../core/services/reservation.service';

@Component({
  selector: 'cp-home-user',
  imports: [],
  templateUrl: './home-user.component.html',
  styleUrl: './home-user.component.scss',
})
export class HomeUserComponent {

  MESES = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
  private router = inject(Router);
  private reservationService = inject(ReservationService);



  userName: string = 'Gabriel'; 
  
  proximasReservas: any[] = [];

  ngOnInit(): void {
    this.reservationService.getMyReservations(2).subscribe({
      next: (response) => {
        this.proximasReservas = response.content.map(res => {
          const dataOriginal = new Date(res.date + 'T00:00:00');
          return {
            id: res.id,
            dia: dataOriginal.getDate().toString().padStart(2, '0'),
            mes: this.MESES[dataOriginal.getMonth()],
            status: res.status
          };
        });        
      },
      error: (err) => {
        console.error('Erro ao carregar reservas:', err);
      }
    });
  }


  verTodas() {
    this.router.navigate(['/reservas']);
  }

  novaReserva() {
    this.router.navigate(['/reservas/nova']);
  }

  detalhesReserva(id: number) {
    console.log(`Navegando para detalhes da reserva ${id}`);
  }

}
