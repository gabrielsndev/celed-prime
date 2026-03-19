import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { ReservationService } from '../../../core/services/reservation.service';

@Component({
  selector: 'cp-reserve-calendar',
  standalone:true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDatepickerModule,
    MatButtonModule,
  ],
  templateUrl: './reserve-calendar.component.html',
  styleUrl: './reserve-calendar.component.scss',
})
export class ReserveCalendarComponent implements OnInit {

  private service  = inject(ReservationService);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.service.getAvailability().subscribe( res => {
      this.dates = res;
      this.cdr.markForCheck();
      this.cdr.detectChanges();
      console.log('Datas indisponíveis:', this.dates);
    }, err => {
      console.error('Erro ao fazer a requisição:', err);
    });
  }


  dates:string[] = [];

    dateClass: MatCalendarCellClassFunction<Date> = (cellDate:Date, view:string) => {
      if (view === 'month') {
        const year = cellDate.getFullYear();
        const month = (cellDate.getMonth() + 1).toString().padStart(2, '0');
        const day = cellDate.getDate().toString().padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;

        return this.dates.includes(formattedDate) ? 'special-date' : '';
      }

      return '';
    };

}
  