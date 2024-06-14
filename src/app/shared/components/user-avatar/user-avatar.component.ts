import { Component, Input } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-user-avatar',
  standalone: true,
  imports: [AvatarModule],
  templateUrl: './user-avatar.component.html',
})
export class UserAvatarComponent {
  @Input() label = '';
}
