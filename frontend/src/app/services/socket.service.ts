import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;

  constructor() {
    // this.socket = io('http://localhost:3000');
    this.socket = io(environment.apiUrl, {
      transports: ['websocket'],
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
    });
  }

  emitEvent(event: string, data: any) {
    console.log(`Emitting event: ${event}`, data);
    console.log('data:', data);
    this.socket.emit(event, data);
  }

  onEvent<T>(event: string) {
    return new Observable<T>((observer) => {
      this.socket.on(event, (data: T) => {
        console.log(`Listening for event: ${event}`);
        console.log('Received data:', data);
        observer.next(data);
      });
    });
  }
}
