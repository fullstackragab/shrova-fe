import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NewsletterService {
  constructor(private http: HttpClient) {}

  addToNewsletter(newsletter: any) {
    return this.http.post(environment.API_URL + '/newsletter', newsletter, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
