import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { TaskListComponent } from './components/task-list/task-list.component';

export const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [{ path: 'tasks', component: TaskListComponent }],
  },
  { path: 'login', component: LoginComponent },
];
