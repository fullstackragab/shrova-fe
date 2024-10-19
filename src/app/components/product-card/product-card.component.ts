import { Component, Input } from '@angular/core';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PRODUCTS_PROKEN_IMAGE_PLACEHOLDER } from '../../data/constants';
import { CommonModule } from '@angular/common';
import { Product } from '../../data/product';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    TruncatePipe,
    CardModule,
    RouterLink,
    ButtonModule,
    OverlayPanelModule,
    CommonModule,
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Input() showLinks = false;
  @Input() showTitle = false;
  @Input() showTags = false;

  constructor() {}

  onImageError(e: any) {
    e.target.src = PRODUCTS_PROKEN_IMAGE_PLACEHOLDER;
  }

  onIgnoreClick(e: any) {
    e.prenventDefault();
  }
}
