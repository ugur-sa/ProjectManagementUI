import { Component, inject, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../features/auth/services/auth.service';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { UserSettingsDialogComponent } from './components/user-settings-dialog/user-settings-dialog.component';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    MatIconButton,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    MatIcon,
    MatButton,
  ],
  templateUrl: './nav.component.html',
})
export class NavComponent {
  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;

  authService = inject(AuthService);
  router = inject(Router);

  constructor(public dialog: MatDialog) {}

  getInitial(): string {
    return (
      this.authService.currentUserSig()?.username.charAt(0).toUpperCase() ?? ''
    );
  }

  openDialog() {
    const dialogRef = this.dialog.open(UserSettingsDialogComponent, {
      restoreFocus: false,
    });

    dialogRef.afterClosed().subscribe(() => this.menuTrigger.focus);
  }
}
