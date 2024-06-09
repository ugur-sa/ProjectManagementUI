import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLinkActive, RouterLink],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  router = inject(Router);
}
