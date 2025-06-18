import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { Task } from '../../models/task.model';
import { DeleteDialogComponent } from '../dialogs/delete-dialog/delete-dialog.component';
import { EditDialogComponent } from '../dialogs/edit-dialog/edit-dialog.component';
import { CommonModule } from '@angular/common';
import { SocketService } from '../../services/socket.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-task',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent {
  @Input() task!: Task;
  isEditable$: Observable<boolean> = of(false);

  readonly dialog = inject(MatDialog);
  socketService = inject(SocketService);

  constructor() {
    this.socketService.onEvent('task:editing-disabled').subscribe((taskId) => {
      if (this.task.id === (taskId as string)) {
        this.isEditable$ = of(true);
      }
    });

    this.socketService.onEvent('task:editing-enabled').subscribe((taskId) => {
      if (this.task.id === (taskId as string)) {
        this.isEditable$ = of(false);
      }
    });
  }

  openDeleteDialog() {
    this.disableEditing();
    this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '0ms',
      data: { currentTaskId: this.task.id },
    });
  }

  openEditDialog() {
    console.log('Opening edit dialog for task:', this.task);
    // Send socket event to disable editing for other users
    this.disableEditing();

    this.dialog.open(EditDialogComponent, {
      width: '1200px',
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '0ms',
      data: { task: this.task, actionType: 'edit' },
    });
  }

  private disableEditing() {
    this.socketService.emitEvent('task:disable-editing', this.task.id);
  }
}
