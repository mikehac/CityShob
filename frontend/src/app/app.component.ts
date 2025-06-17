import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { Observable } from 'rxjs';
import { Task } from './models/task.model';
import { SocketService } from './services/socket.service';
import { TaskService } from './services/task.service';
import { MatIconModule } from '@angular/material/icon';
import { TaskComponent } from './components/task/task.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule,
    MatIconModule,
    TaskComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  socketService = inject(SocketService);
  taskService = inject(TaskService);

  tasks$: Observable<Task[]> = this.taskService.getAllTasks();
}
