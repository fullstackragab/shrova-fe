import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { loadStripe } from '@stripe/stripe-js/pure';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { MessageService } from 'primeng/api';
import { Product } from '../../data/product';

@Component({
  selector: 'app-buy-buttons',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './buy-buttons.component.html',
  styleUrl: './buy-buttons.component.css',
})
export class BuyButtonsComponent {
  @Input() product!: Product;

  constructor(
    // private booksService: BooksService,
    private cartService: CartService,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {}

  onBuyProduct() {
    if (this.authService.isLoggedIn.getValue()) {
      this.cartService.addItem({
        id: this.product.id,
        name: this.product.title,
        imageUrl: this.product.imageUrl,
        price: this.product.price,
        quantity: 1,
      });
      this.messageService.add({
        summary: 'Added',
        detail: 'Prouct added to the cart',
        severity: 'info',
      });
    } else {
      this.router.navigate(['/', 'login']);
    }
  }
}
