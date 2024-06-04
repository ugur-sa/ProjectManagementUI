import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';

import {
  LoginRequest,
  RegisterRequest,
  UserInterface,
} from '../../models/auth';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // private authUrl = `${environment.apiUrl}/auth/login`;
  private realWorldAPI = environment.realWorldAPI;
  currentUserSig = signal<UserInterface | undefined | null>(undefined);

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(loginRequest: LoginRequest): Observable<{ user: UserInterface }> {
    return this.http.post<{ user: UserInterface }>(
      `${this.realWorldAPI}/users/login`,
      { user: loginRequest }
    );
  }

  register(
    registerRequest: RegisterRequest
  ): Observable<{ user: UserInterface }> {
    return this.http.post<{ user: UserInterface }>(
      `${this.realWorldAPI}/users`,
      {
        user: registerRequest,
      }
    );
  }

  logout() {
    localStorage.setItem('token', '');
    this.currentUserSig.set(null);
    void this.router.navigateByUrl('/login');
  }

  isLoggedIn(): boolean {
    this.http
      .get<{ user: UserInterface }>(`${environment.realWorldAPI}/user`)
      .subscribe({
        next: response => {
          this.currentUserSig.set(response.user);
          void this.router.navigateByUrl('/');
          return true;
        },
        error: () => {
          this.currentUserSig.set(null);
          void this.router.navigateByUrl('/login');
          return false;
        },
      });
    return false;
  }
}
