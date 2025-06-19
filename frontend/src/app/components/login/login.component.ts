import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);

  form: FormGroup<{ username: any; password: any }> = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  });

  onSubmit(event: Event): void {
    event.preventDefault();

    if (this.form.valid) {
      this.authService
        .login(this.form.value as { username: string; password: string })
        .subscribe({
          next: (value: any) => {
            // This is just a placeholder for a username, in reality, I would get this from the response
            localStorage.setItem('username', this.form.value.username);
            this.router.navigate(['/tasks']);
          },
          error: (err) => {
            console.error('Login failed', err);
          },
        });
    }
  }
}
