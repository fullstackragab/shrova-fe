import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import {
  DRAFT_STATUS,
  PRODUCTS_PROKEN_IMAGE_PLACEHOLDER,
  PUBLISHED_STATUS,
} from '../../data/constants';
import { Product } from '../../data/product';

@Component({
  selector: 'app-admin-product-card',
  standalone: true,
  imports: [TruncatePipe, CommonModule, ButtonModule],
  templateUrl: './admin-product-card.component.html',
  styleUrl: './admin-product-card.component.css',
})
export class AdminProductCardComponent {
  today = new Date();
  Status = {
    draft: DRAFT_STATUS,
    published: PUBLISHED_STATUS,
  };
  constructor(private router: Router) {}
  @Input() product!: Product;
  @Input() missingDetails: boolean = false;
  @Output() delete = new EventEmitter<void>();
  @Output() pause = new EventEmitter<boolean>();

  onEdit(id: number) {
    this.router.navigate(['/', 'add-product', id]);
  }

  onImageClick(id: number) {
    this.router.navigate(['/', 'product', id]);
  }

  onImageError(e: any) {
    e.target.src = PRODUCTS_PROKEN_IMAGE_PLACEHOLDER;
  }

  onDelete() {
    this.delete.next();
  }

  onPlay() {
    this.pause.next(false);
  }

  onPause() {
    this.pause.next(true);
  }
}
