import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private http: HttpClient) {}

  getOrder(orderId: number) {
    return this.http.get(environment.API_URL + '/orders/' + orderId, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  getOrders(take: number, skip: number) {
    return this.http.get(environment.API_URL + '/orders/all', {
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        take,
        skip,
      },
    });
  }
}
