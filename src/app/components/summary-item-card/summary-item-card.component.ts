import { Component, Input } from '@angular/core';
import { QuantityStepperComponent } from '../quantity-stepper/quantity-stepper.component';

@Component({
  selector: 'app-summary-item-card',
  standalone: true,
  imports: [QuantityStepperComponent],
  templateUrl: './summary-item-card.component.html',
  styleUrl: './summary-item-card.component.css',
})
export class SummaryItemCardComponent {
  @Input() item!: any;
}
