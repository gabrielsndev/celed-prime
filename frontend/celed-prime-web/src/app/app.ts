import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./shared/components/header/header.component";
import { ReserveCalendarComponent } from "./shared/components/reserve-calendar/reserve-calendar.component";

@Component({
  selector: 'cp-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, ReserveCalendarComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('celed-prime-web');
}
