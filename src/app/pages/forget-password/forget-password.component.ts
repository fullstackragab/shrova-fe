import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { first } from 'rxjs';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [PanelModule, ButtonModule, InputTextModule, FormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css',
})
export class ForgetPasswordComponent {
  email = '';
  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {}
  onResetPassword() {
    this.authService
      .requestResetPassword(this.email)
      .pipe(first())
      .subscribe((r) => {
        this.messageService.add({
          summary: 'Send',
          severity: 'info',
          detail: 'Email sent successfully',
        });

        this.router.navigate(['/']);
      });
  }
}
