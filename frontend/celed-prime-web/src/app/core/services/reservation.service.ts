import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})


export class ReservationService {

  private http = inject(HttpClient);
  private readonly  apiUrl = `${API_CONFIG.baseUrl}`;



  public getAvailability(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}${API_CONFIG.endpoints.calendar}`);
  }


  getMyReservations(size: number = 10): Observable<ReservationResponse> {
    const params = new HttpParams()
      .set('size', size.toString())
      .set('sort', 'date,asc'); 

    return this.http.get<ReservationResponse>(`${this.apiUrl}${API_CONFIG.endpoints.myReservations}`, { params });
  }


}


export interface ReservationResponse {
  content: any[];
  totalElements: number;
  totalPages: number;
  last: boolean;
}

