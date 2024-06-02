import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RegisterRequest } from '../../models/auth';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './registration.component.html',
})
export class RegistrationComponent {

  registerData = new FormGroup({
    email: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private authService: AuthService, private router: Router) {
  }

  onRegister(): void {
    const registerRequest: RegisterRequest = {
      email: this.registerData.value.email ?? '',
      username: this.registerData.value.username ?? '',
      password: this.registerData.value.password ?? ''
    }
    this.authService.register(registerRequest).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.user.token);
        this.authService.currentUserSig.set(response.user)
        void this.router.navigateByUrl('/')
      },
      error: () => {
        console.error('Registration failed')
      }
    })
  }

}
