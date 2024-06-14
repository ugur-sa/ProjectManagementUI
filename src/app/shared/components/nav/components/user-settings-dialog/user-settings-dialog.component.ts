import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../../features/auth/services/auth.service';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { Button } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-user-settings-dialog',
  standalone: true,
  imports: [FormsModule, Button, DialogModule, InputTextModule],
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

  constructor(public ref: DynamicDialogRef) {}

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
          username: this.formData['username'],
        };
        this.authService.update(updateRequest).subscribe({
          next: response => {
            this.authService.currentUserSig.set(response.user);
            this.loadingSubject.next(false);
            this.formData.username =
              this.authService.currentUserSig()?.username ?? '';
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
            this.formData.email =
              this.authService.currentUserSig()?.email ?? '';
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
