import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { ToastModule } from 'primeng/toast';
import { PanelModule } from 'primeng/panel';
import { StarComponent } from '../../components/star/star.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { first, forkJoin, switchMap, take, tap } from 'rxjs';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import { DividerModule } from 'primeng/divider';
import { TabViewModule } from 'primeng/tabview';
import { DialogModule } from 'primeng/dialog';
import { TYPE_SHIPPING_ADDRESS } from '../../data/constants';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { ADDRESS_TYPES } from '../../data/addressTypes';
import { Address } from '../../data/address';
import { LoadingComponent } from '../../components/loading/loading.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    ToastModule,
    ReactiveFormsModule,
    PanelModule,
    StarComponent,
    InputTextModule,
    ButtonModule,
    DividerModule,
    TabViewModule,
    DialogModule,
    CheckboxModule,
    DropdownModule,
    LoadingComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private authService: AuthService,
    private messagesService: MessageService
  ) {}
  shippingTypeKey = TYPE_SHIPPING_ADDRESS;
  addressTypes = ADDRESS_TYPES;
  addresses: Address[] = [];
  actvIndx = 0;
  visible = false;
  isLoading = false;
  form = this.fb.group({
    firstname: this.fb.control(''),
    lastname: this.fb.control(''),
    email: this.fb.control(
      {
        value: '',
        disabled: true,
      },
      [Validators.required, Validators.email]
    ),
  });

  formAddress = this.fb.group({
    name: this.fb.control('', Validators.required),
    street1: this.fb.control('', Validators.required),
    city: this.fb.control('', Validators.required),
    state: this.fb.control('', Validators.required),
    zip: this.fb.control('', Validators.required),
    country: this.fb.control('', Validators.required),
    type: this.fb.control(TYPE_SHIPPING_ADDRESS, Validators.required),
    isDefault: this.fb.control(false, Validators.required),
  });

  ngOnInit(): void {
    this.loadProfile();
  }

  onSaveAddress() {
    if (this.formAddress.valid) {
      this.usersService
        .addAddress(this.formAddress.value)
        .pipe(
          tap(() => {
            this.loadAddresses();
          })
        )
        .subscribe();
      this.visible = false;
      this.formAddress.reset();
    }
  }

  onSetDefault(addressId: number, addressType: number) {
    this.usersService
      .setDefaultAddress(addressId, addressType)
      .pipe(
        tap(() => {
          this.loadAddresses();
        })
      )
      .subscribe();
  }

  loadProfile() {
    this.usersService
      .getProfile()
      .pipe(take(1))
      .subscribe((p: any) => {
        console.log('rs p : ', p);
        this.form.patchValue({
          firstname: p.firstname,
          lastname: p.lastname,
          email: p.email,
        });
      });
  }

  loadAddresses() {
    this.isLoading = true;
    forkJoin([
      this.usersService.getAllAddresses(),
      this.usersService.getDefaultAddress(),
    ])
      .pipe(first())
      .subscribe({
        next: (a: any) => {
          this.isLoading = false;
          this.addresses = [];
          a[0]?.forEach((t: any) => {
            const found = a[1].find((x: any) => x.id === t.id);
            if (found) t.isDefault = true;
            else t.isDefault = false;
            this.addresses.push(t);
          });
        },
        error: (a: any) => {
          this.isLoading = false;
        },
      });
  }

  onSubmit() {
    this.usersService
      .updateProfile({
        firstname: this.form.value.firstname!,
        lastname: this.form.value.lastname!,
      })
      .pipe(take(1))
      .subscribe({
        next: (r: any) => {
          this.messagesService.add({
            summary: 'Success',
            severity: 'info',
            detail: 'Saved successfully',
          });
          this.authService.user.next({
            fullname:
              this.form.value.firstname + ' ' + this.form.value.lastname,
            email: this.form.value.email!,
            isAdmin: r.isAdmin,
          });
        },
        error: (e) => {
          this.messagesService.add({
            summary: 'Error',
            severity: 'error',
            detail: 'Error updating profile ' + e.error.message,
          });
        },
      });
  }

  onTabChange(e: any) {
    if (e.index === 0) {
      this.loadProfile();
    } else if (e.index === 1) {
      this.loadAddresses();
    }
  }
}
