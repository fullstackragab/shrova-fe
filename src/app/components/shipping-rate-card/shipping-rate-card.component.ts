import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-shipping-rate-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shipping-rate-card.component.html',
  styleUrl: './shipping-rate-card.component.css',
})
export class ShippingRateCardComponent {
  @Input() rate!: any;
  @Input() selected: boolean = false;
  @Input() cheapest: boolean = false;
  @Input() fastest: boolean = false;
  @Input() bestValue: boolean = false;
}
