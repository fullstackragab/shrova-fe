import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import {
  ConfirmationService,
  MessageService,
  SelectItemGroup,
} from 'primeng/api';
import { PanelModule } from 'primeng/panel';
import { DecimalPipe } from '@angular/common';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { StarComponent } from '../../components/star/star.component';
import { ToastModule } from 'primeng/toast';
import { loadStripe } from '@stripe/stripe-js/pure';
import { environment } from '../../../environments/environment';
import { DividerModule } from 'primeng/divider';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AuthService } from '../../services/auth.service';
import { first, tap } from 'rxjs';
import { QuillModule } from 'ngx-quill';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { CheckboxModule } from 'primeng/checkbox';
import { Category } from '../../data/category';
import { Product } from '../../data/product';
import { ProductsService } from '../../services/products.service';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { DISTANCE_UNITS } from '../../data/distanceUnits';
import { WEIGHT_UNITS } from '../../data/weightUnits';
import { title } from 'process';
import { CategoriesService } from '../../services/categories.service';
import {
  FileUploadEvent,
  FileUploadModule,
  UploadEvent,
} from 'primeng/fileupload';
import { FilesService } from '../../services/files.service';
import { OrderListModule } from 'primeng/orderlist';
import { LoadingComponent } from '../../components/loading/loading.component';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
    PanelModule,
    FormsModule,
    DecimalPipe,
    OverlayPanelModule,
    StarComponent,
    ToastModule,
    DividerModule,
    InputTextareaModule,
    QuillModule,
    ConfirmDialogModule,
    ToggleButtonModule,
    CheckboxModule,
    BreadcrumbComponent,
    FileUploadModule,
    OrderListModule,
    LoadingComponent,
  ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
  providers: [ConfirmationService, MessageService],
})
export class AddProductComponent implements OnInit {
  distanceUnits = DISTANCE_UNITS;
  selectedCategory = {
    title: '',
    id: 0,
  };
  massUnits = WEIGHT_UNITS;
  items: any[] = [];
  categories: Category[] = [];
  isAdmin = false;
  product!: Product;
  productId!: number;
  isLoadingProductImages = false;
  productImages: any[] = [];
  isSavingProduct = false;
  form = this.fb.group({
    title: this.fb.control(''),
    description: this.fb.control(''),
    imageUrl: this.fb.control(''),
    price: this.fb.control(1),
    stock: this.fb.control(1),
    published: this.fb.control(true),
    category: this.fb.control(1),
    width: this.fb.control(1),
    height: this.fb.control(1),
    length: this.fb.control(1),
    weight: this.fb.control(1),
    massUnit: this.fb.control('lb'),
    distanceUnit: this.fb.control('in'),
  });

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private fb: FormBuilder,
    private messagesService: MessageService,
    private authService: AuthService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private categoriesService: CategoriesService,
    private cdr: ChangeDetectorRef,
    private filesService: FilesService
  ) {
    this.productId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.items.push({
      label: 'Manage Products',
      link: '/manage-products',
    });
    if (this.product && this.productId) {
      this.items.push({
        label: 'Edit',
        link: '',
      });
    } else {
      this.items.push({
        label: 'Add New',
        link: '',
      });
    }
    this.loadProduct();
    this.authService.isAdmin.subscribe((r) => (this.isAdmin = r));
    this.categoriesService.getAllCategories().subscribe((t: any) => {
      this.categories = t;
    });
  }

  onChangeCategory() {
    const obj = this.categories.find((t) => t.id === this.form.value.category);
    this.selectedCategory = {
      title: obj?.title ?? '',
      id: obj?.id ?? 0,
    };
  }

  loadProduct() {
    if (this.productId) {
      this.productsService
        .getProduct(this.productId)
        .pipe(first())
        .subscribe((product: any) => {
          this.product = product;
          this.productsService
            .getProductImages(product.id)
            .pipe(first())
            .subscribe((images: any) => {
              this.productImages = images;
            });
          this.form = this.fb.group({
            title: this.fb.control(this.product.title, [Validators.required]),
            description: this.fb.control(this.product.description),
            imageUrl: this.fb.control(this.product.imageUrl),
            price: this.fb.control(this.product.price, [Validators.required]),
            stock: this.fb.control(this.product.stock, [Validators.required]),
            published: this.fb.control(this.product.published),
            category: this.fb.control(this.product.category),
            width: this.fb.control(this.product.width),
            height: this.fb.control(this.product.height),
            length: this.fb.control(this.product.length),
            weight: this.fb.control(this.product.weight),
            massUnit: this.fb.control(this.product.massUnit),
            distanceUnit: this.fb.control(this.product.distanceUnit),
          });
        });
    }
  }

  onPublish() {
    if (this.productId && this.product) {
      this.productsService
        .publishProduct(this.productId, this.form.value.published!)
        .subscribe();
    }
  }

  onSelectMainImage(e: any, fileUpload: any) {
    this.filesService
      .upload(e.files[0])
      .pipe(
        first(),
        tap(() => {
          fileUpload.clear();
        })
      )
      .subscribe((t: any) => {
        this.form.patchValue({
          imageUrl: t.downloadUrl,
        });
      });
  }

  onSelectProductImages(e: any, fileUpload: any) {
    const arr = [];
    this.isLoadingProductImages = true;
    this.filesService
      .uploadFiles(e.files)
      .pipe(first())
      .subscribe({
        next: (results: any) => {
          this.productImages = [...this.productImages, ...results];
          fileUpload.clear();
          this.isLoadingProductImages = false;
          this.cdr.detectChanges();
        },
        error: (e: any) => {
          this.isLoadingProductImages = false;
        },
      });
  }

  onDeleteProductImage(id: number) {
    const idx = this.productImages.findIndex((t) => t.id === id);
    this.productImages.splice(idx, 1);
    this.filesService.deleteFile(id).pipe(first()).subscribe();
  }

  onSubmit() {
    if (this.productId && this.product) {
      this.isSavingProduct = true;
      const data = {
        id: this.productId,
        ...this.form.value,
        productImages: this.productImages,
      };
      this.productsService.updateProduct(data).subscribe({
        next: async (r) => {
          this.messagesService.add({
            severity: 'info',
            summary: 'Update',
            detail: 'Product updated successfully',
          });
          this.isSavingProduct = false;
        },
        error: (e) => {
          console.log(e);
          this.messagesService.add({
            severity: 'error',
            summary: 'Error',
            detail: e.error.message,
          });
          this.isSavingProduct = false;
        },
      });
    } else {
      this.isSavingProduct = true;
      const data = {
        ...this.form.value,
        productImages: this.productImages,
      };
      this.productsService
        .addProduct(data)
        .pipe(first())
        .subscribe({
          next: async (r: any) => {
            this.productId = r.id;
            this.product = r;
            this.messagesService.add({
              severity: 'info',
              summary: 'Successful',
              detail: 'Product added successfully.',
            });
            this.isSavingProduct = false;
            this.router.navigateByUrl('/manage-products');
          },
          error: (e) => {
            console.log(e);
            this.messagesService.add({
              severity: 'error',
              summary: 'Error',
              detail: e.error.message,
            });
            this.isSavingProduct = false;
          },
        });
    }
  }

  onFrontImageUrl(imageUrl: string) {
    this.form.patchValue({
      imageUrl: imageUrl,
    });
  }

  onDeleteProduct() {
    this.confirmationService.confirm({
      message: `
<h3>Are you sure you want to delete this product?</h3>
      `,
      header: 'Delete Product Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',

      accept: () => {
        this.productsService
          .deleteProduct(this.productId)
          .pipe(first())
          .subscribe((t) => {
            this.messagesService.add({
              severity: 'info',
              summary: 'Confirmed',
              detail: 'Product deleted',
            });
            this.router.navigate(['/', 'manage-products']);
          });
      },
      reject: () => {},
    });
  }
}
