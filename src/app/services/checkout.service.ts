import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  constructor(private http: HttpClient) {}

  getSummary(items: string, rateId: string) {
    return this.http.get(environment.API_URL + '/orders/summary', {
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        items,
        rateId,
      },
    });
  }

  checkout(items: { id: number; quantity: number }[]) {
    return this.http.post(
      environment.API_URL + '/products/checkout',
      {
        items,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
