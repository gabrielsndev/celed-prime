import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReserveCalendarComponent } from '../../shared/components/reserve-calendar/reserve-calendar.component';

@Component({
  selector: 'cp-home',
  standalone: true,
  imports: [
    CommonModule,
    ReserveCalendarComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {

}
