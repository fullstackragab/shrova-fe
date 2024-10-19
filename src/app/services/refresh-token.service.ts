import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class RefreshTokenService {
  constructor(private http: HttpClient) {}

  refreshToken(token: string) {
    return this.http.post(
      environment.API_URL + '/auth/refresh',
      {
        refresh: token,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
