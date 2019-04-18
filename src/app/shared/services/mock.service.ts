import { Injectable } from '@angular/core';
import {UserRoles} from "../enums/user-roles.enum";

@Injectable({
  providedIn: 'root'
})
export class MockService {
  public users = [
    {
      id: 1,
      name: 'Alex',
      surname: 'Romanov',
      roles: [UserRoles.Admin, UserRoles.User],
      login: 'ar',
      pass: 'ar',
    },
    {
      id: 2,
      name: 'Peter',
      surname: 'Griffin',
      roles: [UserRoles.User],
      login: 'pete',
      pass: 'pete',
    },
  ];
  constructor() { }
}
