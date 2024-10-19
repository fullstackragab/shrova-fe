import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../../services/auth.service';
import { PanelModule } from 'primeng/panel';
import { MessageService } from 'primeng/api';
import { first } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ButtonModule, InputTextModule, FormsModule, PanelModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent implements OnInit {
  token = '';
  email = '';
  password = '';
  confirmPassword = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.token = this.activatedRoute.snapshot.queryParams['token'];
    this.email = this.activatedRoute.snapshot.queryParams['email'];
  }

  onSave() {
    this.authService
      .resetPassword(this.email, this.token, this.password)
      .pipe(first())
      .subscribe((r) => {
        this.router.navigate(['/', 'login']);
        this.messageService.add({
          summary: 'Success',
          severity: 'info',
          detail: 'Password changed successfully',
        });
      });
  }

  isValid() {
    return this.password && this.password === this.confirmPassword;
  }
}
