import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { LoginRequest, RegisterRequest, UserInterface } from '../models/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // private authUrl = `${environment.apiUrl}/auth/login`;
  private realWorldAPI = environment.realWorldAPI;
  currentUserSig = signal<UserInterface | undefined | null>(undefined);

  constructor(
    private http: HttpClient
  ) {}

  login(loginRequest: LoginRequest): Observable<{ user: UserInterface }> {
    return this.http.post<{ user: UserInterface }>(`${this.realWorldAPI}/users/login`, { user: loginRequest });
  }

  register(registerRequest: RegisterRequest): Observable<{ user: UserInterface }> {
    return this.http.post<{ user: UserInterface }>(`${this.realWorldAPI}/users`, {
      user: registerRequest,
    })
  }
}
