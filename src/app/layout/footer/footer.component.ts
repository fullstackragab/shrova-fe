import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NewsletterComponent } from '../../components/newsletter/newsletter.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, NewsletterComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {}
