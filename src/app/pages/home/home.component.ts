import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabViewModule } from 'primeng/tabview';
import { Router } from '@angular/router';
import { DividerModule } from 'primeng/divider';
import { AuthService } from '../../services/auth.service';
import { PRODUCTS_PAGINATION_TAKE } from '../../data/constants';
import { ProductsService } from '../../services/products.service';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { Product } from '../../data/product';
import { ButtonModule } from 'primeng/button';
import { FeatureComponent } from '../../components/feature/feature.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    TabViewModule,
    DividerModule,
    ProductCardComponent,
    ButtonModule,
    FeatureComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  isLoggedIn = false;
  isLoading = false;
  map = new Map<number, Product[]>();

  constructor(
    private router: Router,
    private authService: AuthService,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.productsService
      .getAll(PRODUCTS_PAGINATION_TAKE, 0)
      .subscribe((t: any) => {
        this.products = t[0];
      });
    /* this.productsService
      .getForCategories('1,2', PRODUCTS_HOME_TAKE, 0)
      .pipe(first())
      .subscribe({
        next: (r: any) => {
          this.isLoading = false;
        },
        error: (e: any) => {
          this.isLoading = false;
        },
      }); */
    this.authService.isLoggedIn.subscribe((r) => (this.isLoggedIn = r));
  }

  onAdClick(obj: any) {}

  onSignup() {
    this.router.navigate(['/', 'signup']);
  }

  onViewAll(category: string) {
    this.router.navigate(['/', 'category', category]);
  }
}
