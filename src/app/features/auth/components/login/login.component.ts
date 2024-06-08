import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../models/auth';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, RouterOutlet],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginData = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  // ngOnInit(): void {
  //   console.log('LoginComponent initialized');
  // }

  onLogin(): void {
    const loginRequest: LoginRequest = {
      email: this.loginData.value.email ?? '',
      password: this.loginData.value.password ?? '',
    };
    this.authService.login(loginRequest).subscribe({
      next: response => {
        localStorage.setItem('token', response.user.token);
        this.authService.currentUserSig.set(response.user);
        void this.router.navigateByUrl('/dashboard');
      },
      error: () => {
        console.error('Login failed');
      },
    });
  }
}
