import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginRequest, LoginResponse, MyJwtPayload } from '../models/auth.model';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { UserRegistration, UserResponse } from '../models/user.model';
import { jwtDecode, JwtPayload } from 'jwt-decode';

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

  public getRole(): string | null {
    const token = localStorage.getItem('cp_token');
    if (!token) return null;

    try {
      const decoded = jwtDecode<MyJwtPayload>(token);
      return decoded.role;
    }
    catch (error) {
      return null;
    }
  }

  public getUserEmail(): string | null {
    const token = localStorage.getItem('cp_token');
    if (!token) return null;
  
    const decoded = jwtDecode<JwtPayload>(token);
    return decoded.sub ?? null; 
  }

}