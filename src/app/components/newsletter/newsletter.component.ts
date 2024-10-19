import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { NewsletterService } from '../../services/newsletter.service';
import { MessageService } from 'primeng/api';
import { first } from 'rxjs';

@Component({
  selector: 'app-newsletter',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ButtonModule, InputTextModule],
  templateUrl: './newsletter.component.html',
  styleUrl: './newsletter.component.css',
})
export class NewsletterComponent {
  constructor(
    private fb: FormBuilder,
    private newsletterService: NewsletterService,
    private messageService: MessageService
  ) {}
  form = this.fb.group({
    email: this.fb.control('', [Validators.required, Validators.email]),
  });

  onSubmit() {
    this.newsletterService
      .addToNewsletter(this.form.value)
      .pipe(first())
      .subscribe((r) => {
        this.form.patchValue({
          email: '',
        });
        this.messageService.add({
          summary: 'Successful',
          severity: 'info',
          detail: 'Successfully added to our newsletter!',
        });
      });
  }
}
