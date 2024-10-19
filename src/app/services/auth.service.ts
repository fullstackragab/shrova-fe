import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { CartService } from './cart.service';
import { ACCESS_TOKEN, REFRESH_TOKEN, USER } from '../data/constants';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = new BehaviorSubject<boolean>(false);
  isAdmin = new BehaviorSubject<boolean>(false);
  user = new BehaviorSubject<{
    fullname: string;
    email: string;
    isAdmin: boolean;
  }>({
    fullname: '',
    email: '',
    isAdmin: false,
  });
  userObj: any = {};
  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: any,
    private usersService: UsersService,
    private cartService: CartService
  ) {}

  login(username: string, password: string) {
    return this.http
      .post(
        environment.API_URL + '/auth/login',
        {
          username,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .pipe(
        switchMap((r: any) => {
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem(ACCESS_TOKEN, r.accessToken);
            localStorage.setItem(REFRESH_TOKEN, r.refreshToken);
          }
          this.userObj = {
            ...this.userObj,
            id: r.id,
            email: r.email,
            isAdmin: r.isAdmin,
          };
          return this.usersService.getProfile();
        }),
        tap((r: any) => {
          this.userObj = {
            ...this.userObj,
            firstname: r.firstname,
            lastname: r.lastname,
          };
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem(USER, JSON.stringify(this.userObj));
          }
          this.user.next({
            fullname: this.userObj.firstname + ' ' + this.userObj.lastname,
            email: this.userObj.email,
            isAdmin: this.userObj.isAdmin,
          });
          this.isLoggedIn.next(true);
          this.isAdmin.next(this.userObj.isAdmin);
          this.router.navigate(['/']);
          this.cartService.loadCart();
        })
      );
  }

  signup(firstname: string, lastname: string, email: string, password: string) {
    return this.http
      .post(
        environment.API_URL + '/auth/register',
        {
          firstname,
          lastname,
          email,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .pipe(
        switchMap((r: any) => {
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem(ACCESS_TOKEN, r.accessToken);
            localStorage.setItem(REFRESH_TOKEN, r.refreshToken);
          }
          this.userObj = {
            ...this.userObj,
            id: r.id,
            email: r.email,
            isAdmin: r.isAdmin,
          };
          return this.usersService.getProfile();
        }),
        tap((r: any) => {
          this.userObj = {
            ...this.userObj,
            firstname: r.firstname,
            lastname: r.lastname,
          };
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem(USER, JSON.stringify(this.userObj));
          }
          this.user.next({
            fullname: this.userObj.firstname + ' ' + this.userObj.lastname,
            email: this.userObj.email,
            isAdmin: this.userObj.isAdmin,
          });
          this.isLoggedIn.next(true);
          this.isAdmin.next(this.userObj.isAdmin);
          this.router.navigate(['/']);
          this.cartService.loadCart();
        })
      );
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(ACCESS_TOKEN);
      localStorage.removeItem(USER);
    }
    this.isLoggedIn.next(false);
    this.isAdmin.next(false);
    this.user.next({
      fullname: '',
      email: '',
      isAdmin: false,
    });
    this.cartService.clear();
    this.router.navigate(['/']);
  }

  requestResetPassword(email: string) {
    return this.http.post(
      environment.API_URL + '/auth/request-reset-password',
      { email },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  resetPassword(email: string, token: string, password: string) {
    return this.http.post(
      environment.API_URL + '/auth/reset-password',
      { email, token, password },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
