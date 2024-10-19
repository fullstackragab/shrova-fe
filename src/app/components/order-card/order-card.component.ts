import { Component, Input, OnInit } from '@angular/core';
import { Order } from '../../data/order';
import { DatePipe } from '@angular/common';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-order-card',
  standalone: true,
  imports: [DatePipe, DividerModule],
  templateUrl: './order-card.component.html',
  styleUrl: './order-card.component.css',
})
export class OrderCardComponent {
  @Input() order!: any;
}
