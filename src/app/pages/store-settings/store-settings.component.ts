import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { TYPE_SHIPPING_ADDRESS } from '../../data/constants';
import { first } from 'rxjs';
import { StarComponent } from '../../components/star/star.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Address } from '../../data/address';
import { ProductsService } from '../../services/products.service';
import { CartService } from '../../services/cart.service';
import { StoreSettingsService } from '../../services/store-settings.service';
import { PanelModule } from 'primeng/panel';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-store-settings',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    StarComponent,
    InputTextModule,
    ButtonModule,
    PanelModule,
  ],
  templateUrl: './store-settings.component.html',
  styleUrl: './store-settings.component.css',
})
export class StoreSettingsComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private productsService: ProductsService,
    private cartService: CartService,
    private storeSettingsService: StoreSettingsService,
    private messagesService: MessageService
  ) {}

  form = this.fb.group({
    storeName: this.fb.control('', Validators.required),
    street1: this.fb.control('', Validators.required),
    city: this.fb.control('', Validators.required),
    state: this.fb.control('', Validators.required),
    zip: this.fb.control('', Validators.required),
    country: this.fb.control('', Validators.required),
  });

  ngOnInit(): void {
    this.storeSettingsService
      .getStoreSettings()
      .pipe(first())
      .subscribe((t: any) => {
        if (t && t.length > 0)
          this.form.patchValue({
            ...t[0],
          });
      });
  }

  populateForm(settings: any) {
    if (settings)
      this.form = this.fb.group({
        storeName: this.fb.control(settings.storeName, Validators.required),
        street1: this.fb.control(settings.street1, Validators.required),
        city: this.fb.control(settings.city, Validators.required),
        state: this.fb.control(settings.state, Validators.required),
        zip: this.fb.control(settings.zip, Validators.required),
        country: this.fb.control(settings.country, Validators.required),
      });
  }

  onSave() {
    if (this.form.valid) {
      this.storeSettingsService
        .saveStoreSettings({ ...this.form.value })
        .pipe(first())
        .subscribe({
          next: () => {
            this.messagesService.add({
              summary: 'Success',
              severity: 'info',
              detail: 'Saved successfully',
            });
          },
          error: (e: any) => {
            this.messagesService.add({
              summary: 'Error',
              severity: 'error',
              detail: 'Error updating profile ' + e.error.message,
            });
          },
        });
    }
  }
}
