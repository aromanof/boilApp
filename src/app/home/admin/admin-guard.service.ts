// angular
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {UserService} from '../../shared/services/user.service';
import {UserRoles} from '../../shared/enums/user-roles.enum';

// enums

// app service

@Injectable()
export class AdminGuard implements CanActivate {

  public constructor(
      private userService: UserService,
      private router: Router,
  ) { }

  public canActivate(route: ActivatedRouteSnapshot): boolean {
    const user = this.userService.currentUser;

    if (user.roles.indexOf(UserRoles.Admin) > -1) {
      return true;
    }

    // Navigate to the error page
    this.router.navigate([ '/403' ]);
    return false;
  }
}
