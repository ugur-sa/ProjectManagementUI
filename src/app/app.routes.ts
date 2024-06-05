import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { inject } from '@angular/core';
import { AuthService } from './services/auth/auth.service';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [() => inject(AuthService).isLoggedIn()],
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
];
