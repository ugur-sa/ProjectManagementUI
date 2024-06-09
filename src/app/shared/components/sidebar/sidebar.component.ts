import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../features/auth/services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLinkActive, RouterLink],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  router = inject(Router);
  authService = inject(AuthService);
}
