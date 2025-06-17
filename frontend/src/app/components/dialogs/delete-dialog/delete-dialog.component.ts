import { Component, Inject, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { TaskService } from '../../../services/task.service';
import { SocketService } from '../../../services/socket.service';

@Component({
  selector: 'app-delete-dialog',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.scss',
})
export class DeleteDialogComponent {
  taskService = inject(TaskService);
  socketService = inject(SocketService);
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { currentTaskId: string }
  ) {}

  deleteTaskEvent() {
    this.taskService.deleteTask(this.data.currentTaskId).subscribe(() => {
      this.socketService.emitEvent('task:delete', this.data.currentTaskId);
    });
  }
}
