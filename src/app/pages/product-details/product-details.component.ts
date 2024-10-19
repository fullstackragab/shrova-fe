import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { first, forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { QuillViewHTMLComponent } from 'ngx-quill';
import { SearchService } from '../../services/search.service';
import { Product } from '../../data/product';
import { ProductsService } from '../../services/products.service';
import { PRODUCTS_PROKEN_IMAGE_PLACEHOLDER } from '../../data/constants';
import { LoadingComponent } from '../../components/loading/loading.component';
import { BuyButtonsComponent } from '../../components/buy-buttons/buy-buttons.component';
import { GalleriaModule } from 'primeng/galleria';
import { ProductImagesComponent } from '../../components/product-images/product-images.component';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    ProgressSpinnerModule,
    QuillViewHTMLComponent,
    LoadingComponent,
    BuyButtonsComponent,
    GalleriaModule,
    ProductImagesComponent,
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  product!: Product;
  productId!: any;
  shareUrl = '';
  realtedProducts: Product[] = [];
  expiresOn = '';
  isLoading = false;
  keyPoints: any;
  images: any[] = [];
  tags: string[] = [];
  responsiveOptions: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private searchService: SearchService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: any // private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((r) => {
      this.productId = r['id'];
      this.isLoading = true;
      forkJoin([
        this.productsService.getProduct(this.productId),
        this.productsService.getProductImages(this.productId),
      ])
        .pipe(first())
        .subscribe({
          next: (results: any) => {
            this.isLoading = false;
            this.product = results[0];
            this.images = [this.product.imageUrl, ...results[1]];
            //this.tags = this.booksService.getTagsAsStringArray(book.tags);
            // const topics = this.booksService.getRelatedTopicsAsString(
            //   this.book.topic
            // );
          },
          error: (e) => {
            // this.loadingService.stopLoading();
            this.isLoading = false;
          },
        });
      this.responsiveOptions = [
        {
          breakpoint: '1024px',
          numVisible: 5,
        },
        {
          breakpoint: '768px',
          numVisible: 3,
        },
        {
          breakpoint: '560px',
          numVisible: 1,
        },
      ];
    });
  }

  onImageError(e: any) {
    e.target.src = PRODUCTS_PROKEN_IMAGE_PLACEHOLDER;
  }

  onBuyEBook() {}

  onOrderPaperback() {}

  /* onSeries() {
    this.searchService.onSeries(this.book.series);
    this.router.navigate(['/', 'search']);
  } */

  /* onTag(tag: string) {
    this.searchService.onTag(tag);
    this.router.navigate(['/', 'search']);
  } */
}
