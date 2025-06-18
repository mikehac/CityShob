import { inject, Injectable } from '@angular/core';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root',
})
export class EditStatusService {
  socketService = inject(SocketService);

  resetEditing(taskId: string) {
    this.socketService.emitEvent('task:enable-editing', taskId);
  }
}
