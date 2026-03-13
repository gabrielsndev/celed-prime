import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';

@Component({
  selector: 'cp-reserve-calendar',
  imports: [
    CommonModule,
    MatCardModule,
    MatDatepickerModule,
    MatButtonModule,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
    provideNativeDateAdapter()
  ],
  templateUrl: './reserve-calendar.component.html',
  styleUrl: './reserve-calendar.component.scss',
})
export class ReserveCalendarComponent {

  dates:string[] = ['2026-03-15', '2026-03-17', '2026-03-18', '2026-03-21']

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
