import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  /**
   * Creates an instance of AuthGuard.
   * @param {Router} router
   * @param {AuthenticationService} authenticationService
   * @memberof AuthGuard
   */
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!!this.authService.isAuthenticated()) {
      this.router.navigate(['']);
      return false;
    }

    return true;
  }
}
