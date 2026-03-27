import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginRequest, LoginResponse } from '../models/auth.model';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { UserRegistration, UserResponse } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  private http = inject(HttpClient);
  private apiurl = `${API_CONFIG.baseUrl}`;

  public login(credentials: LoginRequest): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${this.apiurl}${API_CONFIG.endpoints.login}`, credentials);
  }

  public register(credentials: UserRegistration): Observable<UserResponse>{
    return this.http.post<UserResponse>(`${this.apiurl}${API_CONFIG.endpoints.register}`, credentials);
  }

}