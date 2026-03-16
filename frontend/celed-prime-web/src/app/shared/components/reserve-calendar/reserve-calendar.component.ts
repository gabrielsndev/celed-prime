import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';

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
export class ReserveCalendarComponent {

  dates:string[] = ['2026-03-15', '2026-03-17', '2026-03-18', '2026-03-21', '2026-04-04', '2026-04-05', '2026-04-06', '2026-04-09', '2026-04-13', '2026-04-14', '2026-04-15', '2026-04-17', '2026-04-21', '2026-04-24', '2026-04-26', '2026-04-29', '2026-05-01'];

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
  