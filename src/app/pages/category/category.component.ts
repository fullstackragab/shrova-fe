import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first, tap } from 'rxjs';
import { PaginatorModule } from 'primeng/paginator';
import { LoadingComponent } from '../../components/loading/loading.component';
import { PRODUCTS_PAGINATION_TAKE } from '../../data/constants';
import { ProductsService } from '../../services/products.service';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { Product } from '../../data/product';
import { Category } from '../../data/category';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [ProductCardComponent, PaginatorModule, LoadingComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent implements OnInit {
  categoryId!: number;
  category!: Category;
  isLoading = false;
  products: Product[] = [];
  page: number = 0;
  take: number = PRODUCTS_PAGINATION_TAKE;
  skip: number = 0;
  total: number = PRODUCTS_PAGINATION_TAKE;
  constructor(
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.products = [];
    this.activatedRoute.params
      .pipe(
        tap((params) => {
          this.categoryId = +params['id'];
          if (this.categoryId) {
            this.productsService
              .getCategory(this.categoryId)
              .pipe(first())
              .subscribe((t: any) => {
                this.category = t;
              });
            this.productsService
              .getForCategory(this.categoryId, PRODUCTS_PAGINATION_TAKE, 0)
              .pipe(first())
              .subscribe({
                next: (results: any) => {
                  this.isLoading = false;
                  this.products = results[0];
                },
                error: (e: any) => {
                  this.isLoading = false;
                },
              });
          }
        })
      )
      .subscribe();
  }

  onPage(obj: any) {
    this.page = obj.page;
    this.skip = obj.page * obj.rows;
    this.take = obj.rows;
    this.loadProducts();
  }

  loadProducts() {
    if (this.categoryId) {
      this.isLoading = true;
      this.productsService
        .getForCategory(this.categoryId, this.take, this.skip)
        .pipe(first())
        .subscribe({
          next: (r: any) => {
            this.isLoading = false;
            this.products = r[0];
            this.total = r[1];
          },
          error: (e: any) => {
            this.isLoading = false;
          },
        });
    }
  }
}
