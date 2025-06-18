import { Component, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

import { Task } from '../../../models/task.model';
import { TaskService } from '../../../services/task.service';
import { SocketService } from '../../../services/socket.service';
import { EditStatusService } from '../../../services/edit-status.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-edit-dialog',
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatIconModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './edit-dialog.component.html',
  styleUrl: './edit-dialog.component.scss',
})
export class EditDialogComponent {
  taskService = inject(TaskService);
  socketService = inject(SocketService);
  editStatusService = inject(EditStatusService);

  readonly completeTaskControl = new FormControl(false);
  readonly titleControl = new FormControl<string | null>('');
  readonly descriptionControl = new FormControl<string | null>('');
  readonly dueDateControl = new FormControl<Date | null>(null);

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { task: Task; actionType: 'edit' | 'add' }
  ) {
    if (this.data.actionType === 'edit' && this.data.task) {
      this.titleControl.setValue(this.data.task.title);
      this.descriptionControl.setValue(this.data.task.description || '');
      this.completeTaskControl.setValue(this.data.task.completed);
      this.dueDateControl.setValue(this.data.task.dueDate || null);
    }
  }

  updateOrAddHandler() {
    const form = new FormControl({
      title: this.titleControl.value,
      description: this.descriptionControl.value,
      dueDate: this.dueDateControl.value,
      completed: this.completeTaskControl.value,
    });
    console.log(form.value);
    if (form.valid) {
      if (this.data.actionType === 'edit') {
        this.taskService
          .updateTask(this.data.task.id!, form.value as Task)
          .subscribe((task) => {
            this.socketService.emitEvent('task:update', task);
            this.editStatusService.resetEditing(this.data.task.id!);
          });
      } else {
        this.taskService.createTask(form.value as Task).subscribe((task) => {
          this.socketService.emitEvent('task:create', task);
        });
      }
    }
  }
}
