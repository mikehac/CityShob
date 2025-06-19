import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  http = inject(HttpClient);
  baseUrl = environment.apiUrl + 'api/tasks';

  get additionalHeaders() {
    return { withCredentials: true };
  }

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl, this.additionalHeaders);
  }

  createTask(task: Partial<Task>): Observable<Task> {
    return this.http.post<Task>(this.baseUrl, task, this.additionalHeaders);
  }

  updateTask(id: string, task: Partial<Task>): Observable<Task> {
    return this.http.put<Task>(
      `${this.baseUrl}/${id}`,
      task,
      this.additionalHeaders
    );
  }

  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/${id}`,
      this.additionalHeaders
    );
  }
}
