import { inject, Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  router = inject(Router);
  cookieService = inject(CookieService);

  canActivate(): boolean | UrlTree {
    const isLoggedIn = !!this.cookieService.get('token');
    if (isLoggedIn) {
      return true;
    }

    return this.router.createUrlTree(['/login']);
  }
}
