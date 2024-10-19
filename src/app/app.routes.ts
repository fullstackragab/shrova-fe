import { Routes } from '@angular/router';
import { CookiesPolicyComponent } from './policies/cookies-policy/cookies-policy.component';
import { CopyrightNoticeComponent } from './policies/copyright-notice/copyright-notice.component';
import { DisclaimerComponent } from './policies/disclaimer/disclaimer.component';
import { DmcaPolicyComponent } from './policies/dmca-policy/dmca-policy.component';
import { PrivacyPolicyComponent } from './policies/privacy-policy/privacy-policy.component';
import { RefundPolicyComponent } from './policies/refund-policy/refund-policy.component';
import { TermsAndConditionsComponent } from './policies/terms-and-conditions/terms-and-conditions.component';
import { TermsOfSaleComponent } from './policies/terms-of-sale/terms-of-sale.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { adminGuard } from './guards/admin.guard';
import { authGuard } from './guards/auth.guard';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { ManageProductsComponent } from './pages/manage-products/manage-products.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { CartComponent } from './pages/cart/cart.component';
import { ShippingComponent } from './pages/shipping/shipping.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { StoreSettingsComponent } from './pages/store-settings/store-settings.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { MyOrdersComponent } from './pages/my-orders/my-orders.component';
import { SuccessComponent } from './pages/success/success.component';
import { CancelComponent } from './pages/cancel/cancel.component';
import { CategoryComponent } from './pages/category/category.component';
import { SearchComponent } from './pages/search/search.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'product/:id', component: ProductDetailsComponent },
  { path: 'category/:id', component: CategoryComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'search', component: SearchComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'success', component: SuccessComponent },
  { path: 'cancel', component: CancelComponent },
  { path: 'cookies-policy', component: CookiesPolicyComponent },
  { path: 'copyright-notice', component: CopyrightNoticeComponent },
  { path: 'disclaimer', component: DisclaimerComponent },
  { path: 'dmca-policy', component: DmcaPolicyComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'refund-policy', component: RefundPolicyComponent },
  { path: 'terms-and-conditions', component: TermsAndConditionsComponent },
  { path: 'terms-of-sale', component: TermsOfSaleComponent },
  { path: 'my-orders', component: MyOrdersComponent },
  { path: 'login', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forget-password', component: ForgetPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'cart', component: CartComponent },
  { path: 'shipping', component: ShippingComponent },
  { path: 'store-settings', component: StoreSettingsComponent },
  { path: 'profile', component: ProfileComponent },

  {
    path: 'manage-products',
    component: ManageProductsComponent,
    canActivate: [authGuard, adminGuard],
  },
  {
    path: 'add-product',
    component: AddProductComponent,
    canActivate: [authGuard, adminGuard],
  },
  {
    path: 'add-product/:id',
    component: AddProductComponent,
    canActivate: [authGuard, adminGuard],
  },

  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' },
];
