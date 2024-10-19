import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getProfile() {
    return this.http.get(environment.API_URL + '/users/profile', {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  updateProfile(body: { firstname: string; lastname: string }) {
    return this.http.put(
      environment.API_URL + '/users/profile',
      {
        firstname: body.firstname,
        lastname: body.lastname,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  getDefaultAddress(addressType?: number) {
    return this.http.get(environment.API_URL + '/users/get-default-address', {
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        addressType: addressType ?? '',
      },
    });
  }

  getAllAddresses() {
    return this.http.get(environment.API_URL + '/users/address', {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  setDefaultAddress(addressId: number, addressType: number) {
    return this.http.post(
      environment.API_URL + '/users/set-default-address',
      {
        addressId,
        addressType,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  addAddress(obj: any) {
    return this.http.post(
      environment.API_URL + '/users/address',
      {
        ...obj,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
