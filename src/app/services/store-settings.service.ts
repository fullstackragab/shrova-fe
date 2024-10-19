import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StoreSettingsService {
  constructor(private http: HttpClient) {}

  getStoreSettings() {
    return this.http.get(environment.API_URL + '/store-settings', {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  saveStoreSettings(storeSettings: any) {
    return this.http.post(
      environment.API_URL + '/store-settings',
      storeSettings,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
