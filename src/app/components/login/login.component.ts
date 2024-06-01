import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../models/auth-request';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit{
  loginData = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    console.log('LoginComponent initialized');
  }

  onLogin(): void {
    const loginRequest: LoginRequest = {
      email: this.loginData.value.email ?? '',
      password: this.loginData.value.password ?? ''
    }
    this.authService.login(loginRequest).subscribe(
      () => {
        this.router.navigate(['/dashboard'])
      },
      error => {
        console.error('Login failed', error)
      }
    );
  }
}
