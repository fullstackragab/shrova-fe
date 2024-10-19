import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-btn-continue',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './btn-continue.component.html',
  styleUrl: './btn-continue.component.css',
})
export class BtnContinueComponent {
  constructor(private router: Router) {}

  onContinue() {
    this.router.navigate(['/']);
  }
}
