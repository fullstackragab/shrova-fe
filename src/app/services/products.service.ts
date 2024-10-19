import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getCategory(categoryId: number) {
    return this.http.get(environment.API_URL + '/categories/' + categoryId, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  checkout(summaryId: number) {
    return this.http.post(
      environment.API_URL + '/products/checkout',
      {
        summaryId,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  getShippingRates(addressTo: string, items: string) {
    return this.http.get(environment.API_URL + '/products/get-shipping-rates', {
      params: {
        addressTo,
        items,
      },
    });
  }

  getProduct(id: number) {
    return this.http.get(environment.API_URL + '/products/' + id, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  getProductImages(id: number) {
    return this.http.get(environment.API_URL + '/products/images/' + id, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  deleteProductFile(productId: number, fileId: number) {
    return this.http.delete(environment.API_URL + '/products/product-file', {
      headers: { 'Content-Type': 'application/json' },
      params: {
        productId,
        fileId,
      },
    });
  }

  getFiltered(filter: any, take: number, skip: number) {
    return this.http.post(
      environment.API_URL + '/products/filter',
      {
        filter,
      },
      {
        params: {
          take,
          skip,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  getAll(take: number, skip: number) {
    return this.http.get(environment.API_URL + '/products/all', {
      params: {
        take,
        skip,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  getForCategory(categoryId: number, take: number, skip: number) {
    return this.http.get(
      environment.API_URL + '/products/for-category/' + categoryId,
      {
        params: {
          take,
          skip,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  getForCategories(categories: string, take: number, skip: number) {
    return this.http.get(environment.API_URL + '/products/get-for-categories', {
      params: {
        categories,
        take,
        skip,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  getAdminPublishedProducts(take: number, skip: number) {
    return this.http.get(
      environment.API_URL + '/products/admin-published-products',
      {
        params: {
          take,
          skip,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  getAdminNotPublishedProducts(take: number, skip: number) {
    return this.http.get(
      environment.API_URL + '/products/admin-not-published-products',
      {
        params: {
          take,
          skip,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  addProduct(product: any) {
    return this.http.post(environment.API_URL + '/products', product, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  updateProduct(product: any) {
    return this.http.put(
      environment.API_URL + '/products/' + product.id,
      product,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  publishProduct(productId: number, published: boolean) {
    return this.http.put(
      environment.API_URL + '/products/publish/' + productId,
      {
        published,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  deleteProduct(productId: number) {
    return this.http.delete(environment.API_URL + '/products/' + productId, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  getRates(addressTo: any, productsIds: string) {
    return this.http.get(environment.API_URL + '/products/get-shipping-rates', {
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        addressTo,
        productsIds,
      },
    });
  }
}
