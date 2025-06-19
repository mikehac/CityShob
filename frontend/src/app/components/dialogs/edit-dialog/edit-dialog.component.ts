import { Component, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

import { Task } from '../../../models/task.model';
import { TaskService } from '../../../services/task.service';
import { SocketService } from '../../../services/socket.service';
import { EditStatusService } from '../../../services/edit-status.service';
import { MatIconModule } from '@angular/material/icon';
import { Observable, of, combineLatest } from 'rxjs';
import { CommonModule } from '@angular/common';
import { map, startWith } from 'rxjs/operators';

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
    CommonModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './edit-dialog.component.html',
  styleUrl: './edit-dialog.component.scss',
})
export class EditDialogComponent {
  taskService = inject(TaskService);
  socketService = inject(SocketService);
  editStatusService = inject(EditStatusService);

  readonly titleControl: FormControl<string | null>;
  readonly descriptionControl: FormControl<string | null>;
  readonly completeTaskControl: FormControl<boolean | null>;
  readonly dueDateControl: FormControl<Date | null>;

  readonly isDisabled$: Observable<boolean>;

  editForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { task: Task; actionType: 'edit' | 'add' }
  ) {
    this.titleControl = new FormControl<string | null>(
      data.actionType === 'edit' && data.task ? data.task.title : '',
      Validators.required
    );
    this.descriptionControl = new FormControl<string | null>(
      data.actionType === 'edit' && data.task
        ? data.task.description || ''
        : '',
      Validators.required
    );
    this.completeTaskControl = new FormControl<boolean | null>(
      data.actionType === 'edit' && data.task ? data.task.completed : false
    );
    this.dueDateControl = new FormControl<Date | null>(
      data.actionType === 'edit' && data.task ? data.task.dueDate || null : null
    );

    this.isDisabled$ = combineLatest([
      this.titleControl.statusChanges.pipe(startWith(this.titleControl.status)),
      this.descriptionControl.statusChanges.pipe(
        startWith(this.descriptionControl.status)
      ),
    ]).pipe(
      map(
        ([titleStatus, descStatus]) =>
          titleStatus === 'INVALID' || descStatus === 'INVALID'
      )
    );

    this.editForm = new FormGroup({
      title: this.titleControl,
      description: this.descriptionControl,
      dueDate: this.dueDateControl,
      completed: this.completeTaskControl,
    });
  }

  updateOrAddHandler($event: any) {
    $event.preventDefault();

    if (this.editForm.valid) {
      if (this.data.actionType === 'edit') {
        this.taskService
          .updateTask(this.data.task.id!, this.editForm.value as Task)
          .subscribe((task) => {
            this.socketService.emitEvent('task:update', task);
            this.editStatusService.resetEditing(this.data.task.id!);
          });
      } else {
        this.taskService
          .createTask(this.editForm.value as Task)
          .subscribe((task) => {
            this.socketService.emitEvent('task:create', task);
          });
      }
    }
  }
}
