import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../features/auth/services/auth.service';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Button } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { UserAvatarComponent } from '../user-avatar/user-avatar.component';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    MenuModule,
    ButtonModule,
    AvatarModule,
    Button,
    DialogModule,
    InputTextModule,
    UserAvatarComponent,
  ],
  providers: [DialogService],
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
