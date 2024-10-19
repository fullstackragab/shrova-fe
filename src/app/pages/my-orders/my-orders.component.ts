import { Component, OnInit } from '@angular/core';
import { Order } from '../../data/order';
import { OrdersService } from '../../services/orders.service';
import { first } from 'rxjs';
import { error } from 'console';
import {
  PRODUCTS_HOME_TAKE,
  PRODUCTS_PAGINATION_TAKE,
} from '../../data/constants';
import { OrderCardComponent } from '../../components/order-card/order-card.component';
import { LoadingComponent } from '../../components/loading/loading.component';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [OrderCardComponent, LoadingComponent, PaginatorModule],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css',
})
export class MyOrdersComponent implements OnInit {
  orders: Order[] = [];
  isLoading = false;
  page: number = 0;
  take: number = PRODUCTS_PAGINATION_TAKE;
  skip: number = 0;
  total: number = PRODUCTS_PAGINATION_TAKE;
  constructor(private ordersService: OrdersService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.loadOrders();
  }

  loadOrders() {
    this.ordersService
      .getOrders(this.take, this.skip)
      .pipe(first())
      .subscribe({
        next: (t: any) => {
          this.orders = t;
          console.log('odrs ', t);
          //this.total = t[1];
          this.isLoading = false;
        },
        error: (e: any) => {
          this.isLoading = false;
        },
      });
  }

  onPage(obj: any) {
    this.page = obj.page;
    this.skip = obj.page * obj.rows;
    this.take = obj.rows;
    this.loadOrders();
  }
}
