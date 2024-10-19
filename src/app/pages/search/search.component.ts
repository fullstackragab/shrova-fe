import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import {
  EmptyFilter,
  Filter,
  FilterComponent,
} from '../../components/filter/filter.component';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { first } from 'rxjs';
import { Product } from '../../data/product';
import { PRODUCTS_PAGINATION_TAKE } from '../../data/constants';
import { ProductsService } from '../../services/products.service';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { PaginatorModule } from 'primeng/paginator';
import { ResizeDirective } from '../../directives/resize.directive';
import { MobileService } from '../../services/mobile.service';
import { LoadingComponent } from '../../components/loading/loading.component';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [
    FilterComponent,
    ButtonModule,
    DialogModule,
    DividerModule,
    ProductCardComponent,
    PaginatorModule,
    ResizeDirective,
    LoadingComponent,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit, AfterContentChecked {
  products: Product[] = [];
  filterOpen = false;
  filter: Filter = EmptyFilter;
  page: number = 0;
  take: number = PRODUCTS_PAGINATION_TAKE;
  skip: number = 0;
  total: number = PRODUCTS_PAGINATION_TAKE;
  isLoading = false;
  shareUrl = '';
  isMobile = false;
  constructor(
    private productsService: ProductsService,
    private mobileService: MobileService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.mobileService.mobile.subscribe(
      (isMobile) => (this.isMobile = isMobile)
    );
  }

  ngAfterContentChecked(): void {
    this.cdr.detectChanges();
  }

  onOpenFilter() {
    this.filterOpen = true;
  }

  onFilter(filter: Filter) {
    console.log('OnFilter: ', filter);
    this.filter = filter;
    this.page = 0;
    this.skip = 0;
    this.take = PRODUCTS_PAGINATION_TAKE;
    this.loadProducts();
  }

  onPage(obj: any) {
    this.page = obj.page;
    this.skip = obj.page * obj.rows;
    this.take = obj.rows;
    this.loadProducts();
  }

  loadProducts() {
    this.isLoading = true;
    let obj = {};
    if (this.filter) {
      obj = {
        ...obj,
        ...this.filter,
      };
    }
    this.productsService
      .getFiltered(obj, this.take, this.skip)
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

  onMobile(value: boolean) {
    this.isMobile = value;
  }
}
