import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'cp-home-user',
  imports: [],
  templateUrl: './home-user.component.html',
  styleUrl: './home-user.component.scss',
})
export class HomeUserComponent {
  private authService = inject(AuthService);
  private router = inject(Router);



  userName: string = 'Gabriel'; 
  
  proximasReservas: any[] = [
    { id: 1, dia: '25', mes: 'out'},
    { id: 2, dia: '30', mes: 'set'},
  ];

  ngOnInit(): void {
    // Aqui buscaria o nome real do usuário se estiver no Token
    // const email = this.authService.getUserEmail();
    // this.userName = email ? email.split('@') : 'Usuário';
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
