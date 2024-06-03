import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';

import {
  LoginRequest,
  RegisterRequest,
  UserInterface,
} from '../../models/auth';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // private authUrl = `${environment.apiUrl}/auth/login`;
  private realWorldAPI = 'https://api.realworld.io/api';
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
}
