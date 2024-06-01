import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Task } from './models/task';
import { TaskService } from './services/task.service';
import { LoginComponent } from './components/login/login.component';

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
  title = 'ProjectManagementUI';
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    console.log("AppComponent initialized");
  }
}
