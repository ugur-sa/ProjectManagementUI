import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Router } from '@angular/router';
import { AuthResponse, LoginRequest } from '../models/auth-request';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl = `${environment.apiUrl}/auth/login`;
  private tokenKey = 'token';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(loginRequest: LoginRequest): Observable<AuthResponse> {
    console.log("This is the AuthService")
    console.log(loginRequest.email, loginRequest.password);

    return this.http.post<AuthResponse>(this.authUrl, loginRequest).pipe(
      tap(response => {
        console.log(response);
      })
    );
  }

  logout(): void {
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

}
