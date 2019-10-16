import { Injectable } from '@angular/core';
import {UserInterface} from '../interfaces/user.interface';
import {UserRoles} from '../enums/user-roles.enum';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public currentUser: UserInterface;
  constructor(
    private cookieService: CookieService,
    private router: Router,
  ) { }

  public retrieveTargetPath(): string {
    return this.currentUser.roles.indexOf(UserRoles.Admin) > -1
      ? 'admin'
      : 'home';
  }

  isAdmin(): boolean {
    return this.currentUser.roles ? this.currentUser.roles.indexOf(UserRoles.Admin) > -1 : false;
  }

  get isLoggedIn(): boolean {
    return !!this.currentUser && !!this.cookieService.get('user-token');
  }

  logOutUser(): void {
    this.cookieService.delete('user-token');
    this.router.navigate(['/']);
  }
}
