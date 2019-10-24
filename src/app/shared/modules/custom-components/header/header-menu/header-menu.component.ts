import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.sass']
})
export class HeaderMenuComponent implements OnInit {

  constructor(
    public userService: UserService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  logOut(): void {
    this.userService.logOutUser();
  }

  goToMaterials(): void {
    this.router.navigate(['/home/materials']);
  }

}
