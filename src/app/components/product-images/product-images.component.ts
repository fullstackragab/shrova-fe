import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-images',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-images.component.html',
  styleUrl: './product-images.component.css',
})
export class ProductImagesComponent {
  _images: any;
  @Input() set images(value: any) {
    this._images = value;
    if (value && value.length > 0) {
      this.selectedImage = value[0];
    } else {
      this.selectedImage = undefined;
    }
  }
  selectedImage: any;
}
