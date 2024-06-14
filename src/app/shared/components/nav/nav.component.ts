import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../features/auth/services/auth.service';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { UserAvatarComponent } from '../user-avatar/user-avatar.component';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MenuModule, UserAvatarComponent],
  templateUrl: './nav.component.html',
})
export class NavComponent implements OnInit {
  items: MenuItem[] | undefined;

  authService = inject(AuthService);
  router = inject(Router);

  ngOnInit() {
    this.items = [
      {
        label: 'Profile',
        items: [
          {
            label: 'Settings',
            icon: 'pi pi-cog',
            command: () => {
              // TODO: Open Dialog on click
              console.log('this should open user settings');
            },
          },
          {
            label: 'Logout',
            icon: 'pi pi-sign-out',
            command: () => {
              this.authService.logout();
            },
          },
        ],
      },
    ];
  }

  getInitial(): string {
    return (
      this.authService.currentUserSig()?.username.charAt(0).toUpperCase() ?? ''
    );
  }
}
