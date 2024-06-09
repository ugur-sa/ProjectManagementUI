import { Component, inject } from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { AuthService } from '../../../../../features/auth/services/auth.service';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-user-settings-dialog',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    MatDivider,
    MatIcon,
    FormsModule,
  ],
  templateUrl: './user-settings-dialog.component.html',
})
export class UserSettingsDialogComponent {
  authService = inject(AuthService);

  private loadingSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public loading$: Observable<boolean> = this.loadingSubject.asObservable();

  editMode = {
    username: false,
    email: false,
  };

  formData = {
    username: this.authService.currentUserSig()?.username || '',
    email: this.authService.currentUserSig()?.email || '',
  };

  toggleEditMode(field: 'username' | 'email') {
    this.editMode[field] = !this.editMode[field];
    if (!this.editMode[field]) {
      this.formData[field] = this.authService.currentUserSig()?.[field] || '';
    }
  }

  save(field: 'username' | 'email') {
    if (this.formData[field].trim() !== '') {
      this.loadingSubject.next(true);
      if (field === 'username') {
        const updateRequest = {
          username: this.formData[field],
        };
        this.authService.update(updateRequest).subscribe({
          next: response => {
            this.authService.currentUserSig.set(response.user);
            this.loadingSubject.next(false);
          },
          error: () => {
            console.error('Error updating username');
            this.loadingSubject.next(false);
          },
        });
      } else if (field === 'email') {
        const updateRequest = {
          email: this.formData[field],
        };
        this.authService.update(updateRequest).subscribe({
          next: response => {
            this.authService.currentUserSig.set(response.user);
            this.loadingSubject.next(false);
          },
          error: () => {
            console.error('Error updating email');
            this.loadingSubject.next(false);
          },
        });
      }
      this.loadingSubject.next(false);
      this.toggleEditMode(field);
    }
  }
}
