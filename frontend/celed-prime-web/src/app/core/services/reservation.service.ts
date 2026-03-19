import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {

  private http = inject(HttpClient);
  private readonly  apiUrl = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.calendar}`;

  public getAvailability(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl);
  }

}
