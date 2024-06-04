import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth/auth.service';
import { NavComponent } from './components/nav/nav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    LoginComponent,
    NavComponent,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  authService = inject(AuthService);
}
