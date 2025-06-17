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
import { MatDialog } from '@angular/material/dialog';
import { EditDialogComponent } from './components/dialogs/edit-dialog/edit-dialog.component';

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
  readonly dialog = inject(MatDialog);

  tasks$: Observable<Task[]> = this.taskService.getAllTasks();
  newTask: Partial<Task> = {
    description: '',
    title: '',
    completed: false,
  };

  constructor() {
    this.socketService.onEvent<Task>('task:created').subscribe((task) => {
      console.log('New task created:', task);
      this.tasks$ = this.taskService.getAllTasks();
    });
    this.socketService.onEvent<Task>('task:deleted').subscribe((task) => {
      console.log('Task deleted:', task);
      this.tasks$ = this.taskService.getAllTasks();
    });
    this.socketService.onEvent<Task>('task:updated').subscribe((task) => {
      console.log('Task updated:', task);
      this.tasks$ = this.taskService.getAllTasks();
    });
  }

  openEditDialog() {
    this.dialog.open(EditDialogComponent, {
      width: '1200px',
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '0ms',
      data: {
        task: this.newTask,
        actionType: 'add',
      },
    });
  }
}
