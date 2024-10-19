import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DividerModule } from 'primeng/divider';
import { first } from 'rxjs';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    PanelModule,
    ButtonModule,
    InputTextModule,
    ToastModule,
    DividerModule,
  ],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent {
  loading = false;
  form = this.fb.group({
    email: this.fb.control('', [Validators.required, Validators.email]),
    password: this.fb.control('', [Validators.required]),
  });

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService
  ) {}

  onSubmit() {
    this.loading = true;
    this.authService
      .login(this.form.value.email!, this.form.value.password!)
      .pipe(first())
      .subscribe({
        next: (r) => {
          this.loading = false;
        },
        error: (e) => {
          this.loading = false;
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: e.error.message,
          });
        },
      });
  }

  onForgetPassword() {
    this.router.navigate(['/', 'forget-password']);
  }

  onSignUp() {
    this.router.navigate(['/', 'signup']);
  }
}
