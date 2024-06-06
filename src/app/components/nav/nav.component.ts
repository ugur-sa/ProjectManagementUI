import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
})
export class NavComponent {
  authService = inject(AuthService);
  router = inject(Router);

  getInitial(): string {
    return (
      this.authService.currentUserSig()?.username.charAt(0).toUpperCase() ?? ''
    );
  }
}
