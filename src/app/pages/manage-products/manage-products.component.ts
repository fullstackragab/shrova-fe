import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PaginatorModule } from 'primeng/paginator';
import { take } from 'rxjs';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { TabViewModule } from 'primeng/tabview';
import { CommonModule } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { PRODUCTS_PAGINATION_TAKE } from '../../data/constants';
import { Product } from '../../data/product';
import { ProductsService } from '../../services/products.service';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { AdminProductCardComponent } from '../../components/admin-product-card/admin-product-card.component';
@Component({
  selector: 'app-manage-products',
  standalone: true,
  imports: [
    PaginatorModule,
    DataViewModule,
    ButtonModule,
    CardModule,
    DividerModule,
    TruncatePipe,
    TabViewModule,
    CommonModule,
    SkeletonModule,
    ConfirmDialogModule,
    ToastModule,
    BreadcrumbComponent,
    AdminProductCardComponent,
  ],
  templateUrl: './manage-products.component.html',
  styleUrl: './manage-products.component.css',
  providers: [ConfirmationService, MessageService],
})
export class ManageProductsComponent implements OnInit {
  publishedProducts_take = PRODUCTS_PAGINATION_TAKE;
  publishedProducts_skip = 0;
  publishedProducts_page = 0;
  publishedProducts_total = PRODUCTS_PAGINATION_TAKE;
  draftProducts_take = PRODUCTS_PAGINATION_TAKE;
  draftProducts_skip = 0;
  draftProducts_page = 0;
  draftProducts_total = PRODUCTS_PAGINATION_TAKE;

  publishedProducts: Product[] = [];
  draftProducts: Product[] = [];
  actvIndx = 0;
  isLoadingPublished = false;
  isLoadingDraft = false;

  items: any[] = [];
  constructor(
    private productsService: ProductsService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.items.push({
      label: 'Manage Products',
      link: '',
    });
    this.loadPublishedProducts();
  }

  loadPublishedProducts() {
    this.isLoadingPublished = true;
    this.productsService
      .getAdminPublishedProducts(
        this.publishedProducts_take,
        this.publishedProducts_skip
      )
      .pipe(take(1))
      .subscribe({
        next: (products: any) => {
          this.isLoadingPublished = false;
          this.publishedProducts = products['0'];
          this.publishedProducts_total = products['1'];
          this.cdr.markForCheck();
        },
        error: (e: any) => {
          this.isLoadingPublished = false;
          this.cdr.markForCheck();
        },
      });
  }

  loadDraftProducts() {
    this.isLoadingDraft = true;
    this.productsService
      .getAdminNotPublishedProducts(
        this.draftProducts_take,
        this.draftProducts_skip
      )
      .pipe(take(1))
      .subscribe({
        next: (products: any) => {
          this.isLoadingDraft = false;
          this.draftProducts = products['0'];
          this.draftProducts_total = products['1'];
          this.cdr.markForCheck();
        },
        error: (e: any) => {
          this.isLoadingDraft = false;
          this.cdr.markForCheck();
        },
      });
  }

  onPublishedProductsPageChange(obj: any) {
    this.publishedProducts_page = obj.page;
    this.publishedProducts_skip = obj.page * obj.rows;
    this.publishedProducts_take = obj.rows;
    this.loadPublishedProducts();
  }

  onDraftProductsPageChange(obj: any) {
    this.draftProducts_page = obj.page;
    this.draftProducts_skip = obj.page * obj.rows;
    this.draftProducts_take = obj.rows;
    this.loadDraftProducts();
  }
  onAdd() {
    this.router.navigate(['/', 'add-product']);
  }

  onTabChange(e: any) {
    if (e.index === 0) {
      this.loadPublishedProducts();
    } else if (e.index === 1) {
      this.loadDraftProducts();
    }
  }
}
