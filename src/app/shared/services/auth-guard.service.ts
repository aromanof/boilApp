// angular
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

// app service
import {UserService} from './user.service';
import { AlertService } from './alert.service';

@Injectable()
export class AuthGuard implements CanActivate {
  public constructor(
      private user: UserService,
      private router: Router,
  ) { }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.user.isLoggedIn) {
      return true;
    }
    // Navigate to the processLogin page
    this.router.navigate([ '/auth' ]);
    return false;
  }
}
