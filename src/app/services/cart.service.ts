import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { first } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart = signal<Cart>({
    items: [],
    count: 0,
    total: 0,
  });

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private http: HttpClient,
    private router: Router
  ) {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        console.log(this.router.url);
        if (this.router.url !== '/success') {
          this.loadCart();
        }
      }, 800);
    }
  }

  loadCart() {
    this.http
      .get(environment.API_URL + '/cart', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .pipe(first())
      .subscribe((t: any) => {
        if (t && t.cart) {
          this.cart.set(JSON.parse(t.cart));
        }
      });
  }

  addItem(item: CartItem) {
    const itemObj = this.cart().items.find((t) => t.id === item.id);
    if (itemObj) {
      this.increaseItem(itemObj);
    } else {
      this.cart.update((prevCart) => ({
        ...prevCart,
        items: [...prevCart.items, item],
        count: prevCart.count + 1,
        total: this.roundNumber(+prevCart.total + +item.price),
      }));
    }
    this.saveCart();
  }

  saveCart() {
    setTimeout(() => {
      this.http
        .post(
          environment.API_URL + '/cart',
          {
            cart: JSON.stringify(this.cart()),
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        .pipe(first())
        .subscribe();
    }, 100);
  }

  roundNumber(v: number) {
    return Math.round((v + Number.EPSILON) * 100) / 100;
  }

  increaseItem(item: CartItem) {
    this.cart.update((prevCart) => {
      const newCart = {
        ...prevCart,
        items: [...prevCart.items],
      };
      const itemObj = newCart.items.find((t) => t.id === item.id);
      itemObj!.quantity = +itemObj!.quantity + 1;
      newCart.count++;
      newCart.total += +itemObj!.price;
      newCart.total = this.roundNumber(+newCart.total);
      return newCart;
    });
    this.saveCart();
  }

  decreaseItem(item: CartItem) {
    this.cart.update((prevCart) => {
      const newCart = {
        ...prevCart,
        items: [...prevCart.items],
      };
      const itemObj = newCart.items.find((t) => t.id === item.id);
      itemObj!.quantity = +itemObj!.quantity - 1;
      newCart.count--;
      newCart.total -= +itemObj!.price;
      newCart.total = this.roundNumber(+newCart.total);
      return newCart;
    });
    this.saveCart();
  }

  removeItem(item: CartItem) {
    this.cart.update((prevCart) => {
      const newCart = {
        ...prevCart,
        items: [...prevCart.items.filter((t) => t.id !== item.id)],
      };
      const itemObj = prevCart.items.find((t) => t.id === item.id);
      newCart.count -= +itemObj!.quantity;
      newCart.total -= +itemObj!.price * +itemObj!.quantity;
      newCart.total = this.roundNumber(+newCart.total);
      return newCart;
    });
    this.saveCart();
  }

  clear() {
    this.cart.set({
      items: [],
      count: 0,
      total: 0,
    });
  }
}

export interface CartItem {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  count: number;
  total: number;
}
