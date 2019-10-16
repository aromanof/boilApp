import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.sass']
})
export class HeaderMenuComponent implements OnInit {

  constructor(public userService: UserService) { }

  ngOnInit() {
  }

  logOut(): void {
    this.userService.logOutUser();
  }

}
