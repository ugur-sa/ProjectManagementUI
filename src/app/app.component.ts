import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';
import { HttpClient } from '@angular/common/http';
import { UserInterface } from './models/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    LoginComponent,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit{
  authService = inject(AuthService);
  http = inject(HttpClient);
  router = inject(Router);
  title = 'ProjectManagementUI';

  ngOnInit(): void {
    this.http.get<{user: UserInterface}>('https://api.realworld.io/api/user')
      .subscribe({
        next: response => {
          this.authService.currentUserSig.set(response.user)
          void this.router.navigateByUrl('/');
        },
        error: () => {
          this.authService.currentUserSig.set(null);
          void this.router.navigateByUrl('/login');
        }
      });
  }

  onLogout() {
    localStorage.setItem('token', '');
    this.authService.currentUserSig.set(null);
    void this.router.navigateByUrl('/login');
  }
}
