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
  readonly dialog = inject(MatDialog);

  openDeleteDialog() {
    this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '0ms',
      data: { currentTaskId: this.task.id },
    });
  }

  openEditDialog() {
    console.log('Opening edit dialog for task:', this.task);
    this.dialog.open(EditDialogComponent, {
      width: '1200px',
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '0ms',
      data: { task: this.task, actionType: 'edit' },
    });
  }
}
