import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { TYPE_SHIPPING_ADDRESS } from '../../data/constants';
import { first, forkJoin } from 'rxjs';
import { StarComponent } from '../../components/star/star.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Address } from '../../data/address';
import { ProductsService } from '../../services/products.service';
import { CartService } from '../../services/cart.service';
import { PanelModule } from 'primeng/panel';
import { ShippingRateCardComponent } from '../../components/shipping-rate-card/shipping-rate-card.component';
import { LoadingComponent } from '../../components/loading/loading.component';
import { DividerModule } from 'primeng/divider';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shipping',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    StarComponent,
    InputTextModule,
    ButtonModule,
    PanelModule,
    ShippingRateCardComponent,
    LoadingComponent,
    DividerModule,
  ],
  templateUrl: './shipping.component.html',
  styleUrl: './shipping.component.css',
})
export class ShippingComponent implements OnInit {
  dimensions = {};
  address: Address | undefined;
  rates: any[] = [];
  selectedRate: any;
  isLoading = false;
  featuredRates: any[] = [];
  otherRates: any[] = [];
  bestValue: any;
  fastest: any;
  cheapest: any;
  shouldUpdateShippingMethods = true;

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private productsService: ProductsService,
    private cartService: CartService,
    private router: Router
  ) {}

  form = this.fb.group({
    name: this.fb.control('', Validators.required),
    street1: this.fb.control('', Validators.required),
    city: this.fb.control('', Validators.required),
    state: this.fb.control('', Validators.required),
    zip: this.fb.control('', Validators.required),
    country: this.fb.control('', Validators.required),
    type: this.fb.control(TYPE_SHIPPING_ADDRESS, Validators.required),
  });

  ngOnInit(): void {
    forkJoin([
      this.usersService.getProfile(),
      this.usersService.getDefaultAddress(TYPE_SHIPPING_ADDRESS),
    ])
      .pipe(first())
      .subscribe({
        next: (a: any) => {},
        error: (e: any) => {},
      });
    this.usersService
      .getDefaultAddress(TYPE_SHIPPING_ADDRESS)
      .pipe(first())
      .subscribe((t: any) => {
        if (t && t.length > 0) {
          this.address = t[0];
          this.populateForm();
          this.loadShippingMethods();
        }
      });
  }

  loadShippingMethods() {
    this.isLoading = true;
    this.productsService
      .getShippingRates(
        JSON.stringify(this.form.value),
        JSON.stringify(
          this.cartService.cart().items.map((t) => ({
            id: t.id,
            quantity: t.quantity,
          }))
        )
      )
      .pipe(first())
      .subscribe({
        next: (t: any) => {
          if (t && t.rates && t.rates.length > 0) {
            this.rates = t.rates;
            this.bestValue = this.rates.find(
              (rate: any) => rate.attributes[0] === 'BESTVALUE'
            );
            this.fastest = this.rates.find(
              (rate: any) => rate.attributes[0] === 'FASTEST'
            );
            this.cheapest = this.rates.find(
              (rate: any) => rate.attributes[0] === 'CHEAPEST'
            );
            this.rates.forEach((rate: any) => {
              if (
                rate.objectId !== this.bestValue?.objectId &&
                rate.objectId !== this.fastest?.objectId &&
                rate.objectId !== this.cheapest?.objectId
              ) {
                this.otherRates.push(rate);
              }
            });
          }
          this.isLoading = false;
        },
        error: (e: any) => {
          this.isLoading = false;
        },
      });
  }

  onSelectRate(rate: any) {
    this.selectedRate = rate;
  }

  onCheckout() {
    if (this.selectedRate) {
      this.router.navigate(['/', 'checkout'], {
        queryParams: {
          rateId: this.selectedRate.objectId,
        },
      });
    }
  }

  populateForm() {
    if (this.address) {
      this.form = this.fb.group({
        name: this.fb.control(this.address.name, Validators.required),
        street1: this.fb.control(this.address.street1, Validators.required),
        city: this.fb.control(this.address.city, Validators.required),
        state: this.fb.control(this.address.state, Validators.required),
        zip: this.fb.control(this.address.zip, Validators.required),
        country: this.fb.control(this.address.country, Validators.required),
        type: this.fb.control(this.address.type, Validators.required),
      });
      this.form.valueChanges.subscribe((t: any) => {
        this.shouldUpdateShippingMethods = false;
      });
    }
  }

  onUpdateShipping() {
    this.shouldUpdateShippingMethods = true;
    this.loadShippingMethods();
  }
}
