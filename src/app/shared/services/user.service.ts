import { Injectable } from '@angular/core';
import {UserInterface} from '../interfaces/user.interface';
import {UserRoles} from '../enums/user-roles.enum';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public currentUser: UserInterface;
  public isLoggedIn: boolean;
  constructor() { }

  public retrieveTargetPath(): string {
    return this.currentUser.roles.indexOf(UserRoles.Admin) > -1
      ? 'admin'
      : 'home';
  }
}
