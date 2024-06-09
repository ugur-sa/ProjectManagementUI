import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../features/auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  authService = inject(AuthService);
}
