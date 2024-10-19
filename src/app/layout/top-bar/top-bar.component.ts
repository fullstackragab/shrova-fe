import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  Injector,
  OnInit,
  computed,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SidenavService } from '../../services/sidenav.service';
import { SearchService } from '../../services/search.service';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ProgressBarModule } from 'primeng/progressbar';
import { CategoriesMenuComponent } from '../../components/categories-menu/categories-menu.component';
import { BadgeModule } from 'primeng/badge';
import { CartService } from '../../services/cart.service';
import { StoreSettingsService } from '../../services/store-settings.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    FormsModule,
    ProgressBarModule,
    BadgeModule,
    CategoriesMenuComponent,
  ],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css',
})
export class TopBarComponent implements OnInit {
  searchTerm = '';
  sidenavService!: SidenavService;
  isLoggedIn = false;
  storeName = '';

  total = computed(() => this.cartService.cart().total);
  count = computed(() => this.cartService.cart().count);

  mobileSearchBox = false;
  constructor(
    private injector: Injector,
    private searchService: SearchService,
    private cartService: CartService,
    private router: Router,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private storeSettingsService: StoreSettingsService
  ) {
    this.sidenavService = this.injector.get(SidenavService);
  }

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe((r) => {
      this.isLoggedIn = r;
      this.cdr.markForCheck();
    });
    this.storeSettingsService
      .getStoreSettings()
      .pipe(first())
      .subscribe((t: any) => {
        if (t && t.length > 0) this.storeName = t[0].storeName;
      });
  }

  toggleSidenav() {
    this.sidenavService.toggle();
  }

  onSearch() {
    this.searchService.onTitle(this.searchTerm);
    this.router.navigate(['/', 'search']);
  }
  onLogin() {
    this.router.navigate(['/', 'login']);
  }
  onSignup() {
    this.router.navigate(['/', 'signup']);
  }
  onPricing() {
    this.router.navigate(['/', 'pricing']);
  }
  toggleMobileSearchBox() {
    this.mobileSearchBox = !this.mobileSearchBox;
  }
  onItemClick(topics: string) {
    this.router.navigate(['/', 'courses'], {
      queryParams: {
        topics,
      },
    });
  }
}
