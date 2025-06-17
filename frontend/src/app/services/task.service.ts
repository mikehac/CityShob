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

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl);
  }

  createTask(task: Partial<Task>): Observable<Task> {
    return this.http.post<Task>(this.baseUrl, task);
  }

  updateTask(id: string, task: Partial<Task>): Observable<Task> {
    return this.http.put<Task>(`${this.baseUrl}/${id}`, task);
  }

  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
