import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { PLATFORM_ID, inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../data/constants';
import { isPlatformBrowser } from '@angular/common';
import { RefreshTokenService } from '../services/refresh-token.service';

export const authInterceptor: HttpInterceptorFn = (req: any, next: any) => {
  const platformId = inject(PLATFORM_ID);
  if (isPlatformBrowser(platformId)) {
    const authToken = localStorage.getItem(ACCESS_TOKEN);
    const router = inject(Router);
    const refreshTokenService = inject(RefreshTokenService);
    if (authToken) {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + authToken),
      });
      console.log('interceptor - auth headers: ', authReq.headers);
      return next(authReq).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            if (req.url.endsWith('/refresh')) {
              router.navigateByUrl('/login');
            } else {
              const refreshToken = localStorage.getItem(REFRESH_TOKEN);

              if (refreshToken) {
                return refreshTokenService.refreshToken(refreshToken).pipe(
                  switchMap((result: any) => {
                    localStorage.setItem(ACCESS_TOKEN, result.accessToken);

                    const retriedReq = req.clone({
                      headers: req.headers.set(
                        'Authorization',
                        'Bearer ' + result.accessToken
                      ),
                    });
                    return next(retriedReq);
                  })
                );
              }
            }
          }
          return throwError(() => error);
        })
      );
    } else return next(req);
  } else {
    return next(req);
  }
};
