import { Component, computed } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItemCardComponent } from '../../components/cart-item-card/cart-item-card.component';
import { ButtonModule } from 'primeng/button';
import { ProductsService } from '../../services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CartItemCardComponent, ButtonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  count = computed(() => this.cartService.cart().count);
  total = computed(() => this.cartService.cart().total);
  items = computed(() => this.cartService.cart().items);

  constructor(private cartService: CartService, private router: Router) {}

  onItemQuantityUpdate(quantity: number, id: number) {
    let increase = true;
    const item = this.items().find((t) => t.id === id);
    if (quantity < item!.quantity) increase = false;
    if (increase) {
      this.cartService.increaseItem(item!);
    } else {
      this.cartService.decreaseItem(item!);
    }
  }

  onRemoveItem(id: number) {
    const item = this.items().find((t) => t.id === id);
    this.cartService.removeItem(item!);
  }

  onShipping() {
    this.router.navigate(['/', 'shipping']);
  }
}
