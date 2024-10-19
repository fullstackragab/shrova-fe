import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ActivatedRoute } from '@angular/router';
import { CheckoutService } from '../../services/checkout.service';
import { first } from 'rxjs';
import { LoadingComponent } from '../../components/loading/loading.component';
import { SummaryItemCardComponent } from '../../components/summary-item-card/summary-item-card.component';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { loadStripe } from '@stripe/stripe-js/pure';
import { environment } from '../../../environments/environment.development';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    LoadingComponent,
    SummaryItemCardComponent,
    ButtonModule,
    DividerModule,
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  rateId: any;
  summary: any;
  isLoading = false;
  paymentClicked = false;
  constructor(
    private cartService: CartService,
    private route: ActivatedRoute,
    private checkoutService: CheckoutService,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.rateId = this.route.snapshot.queryParams['rateId'];

    this.checkoutService
      .getSummary(
        JSON.stringify(
          this.cartService
            .cart()
            .items.map((t) => ({ id: t.id, quantity: t.quantity }))
        ),
        this.rateId
      )
      .pipe(first())
      .subscribe({
        next: (t: any) => {
          this.isLoading = false;
          this.summary = t;
        },
        error: (e: any) => {
          this.isLoading = false;
        },
      });
  }

  async onCheckout() {
    if (this.summary) {
      this.paymentClicked = true;
      this.productsService
        .checkout(this.summary.id)
        .pipe(first())
        .subscribe({
          next: async (r: any) => {
            const session = r as any;
            const stripe = await loadStripe(environment.STRIPE_PK);
            const result = await stripe?.redirectToCheckout({
              sessionId: session.id,
            });
            if (result?.error) {
              console.log(result?.error);
              this.paymentClicked = false;
            }
            this.cartService.clear();
          },
          error: (e: any) => {
            this.paymentClicked = false;
          },
        });
    }
  }
}
