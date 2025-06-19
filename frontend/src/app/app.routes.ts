import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { AuthGuard } from './services/auth.guard';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'tasks',
        component: TaskListComponent,
      },
    ],
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },
];
