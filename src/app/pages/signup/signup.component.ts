import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DividerModule } from 'primeng/divider';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { first } from 'rxjs';
import { StarComponent } from '../../components/star/star.component';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    PanelModule,
    CommonModule,
    DividerModule,
    ToastModule,
    StarComponent,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  loading = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}
  form = this.fb.group({
    firstname: this.fb.control('', [Validators.required]),
    lastname: this.fb.control('', [Validators.required]),
    email: this.fb.control('', [Validators.required, Validators.email]),
    password: this.fb.control('', Validators.required),
  });

  onSubmit() {
    this.loading = true;
    this.authService
      .signup(
        this.form.value.firstname!,
        this.form.value.lastname!,
        this.form.value.email!,
        this.form.value.password!
      )
      .pipe(first())
      .subscribe({
        next: (r) => {
          this.loading = false;
          this.router.navigate(['/']);
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

  onSignIn() {
    this.router.navigate(['/', 'login']);
  }
}
