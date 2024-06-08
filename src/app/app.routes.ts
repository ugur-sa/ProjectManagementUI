import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/components/login/login.component';
import { RegistrationComponent } from './features/auth/components/registration/registration.component';
import { DashboardComponent } from './pages/projects/components/dashboard/dashboard.component';
import { isLoggedInGuard } from './core/guards/is-logged-in.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [isLoggedInGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
];
