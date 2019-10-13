import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {MockService} from "../shared/services/mock.service";
import {UserService} from "../shared/services/user.service";
import {AlertService} from "../shared/services/alert.service";
import {ApiService} from "../shared/services/api.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  public password: string;
  public login: string;
  constructor(
      private router: Router,
      private mockService: MockService,
      private user: UserService,
      private alert: AlertService,
      private apiService: ApiService,
  ) { }

  ngOnInit() { }

  public processLogin(login: string, password: string): void {
    // const currentUser = this.mockService.users.find(el => el.login === login && el.pass === password);
    // if (currentUser) {
    //   this.user.currentUser = currentUser;
    //   this.user.isLoggedIn = true;
    //   this.router.navigate([`/${this.user.retrieveTargetPath()}`]);
    // } else {
    //   this.alert.showErrorMessage(
    //       'Пользователь с таким логином не найден, или пароль оказался не верным! Пожалуйста, проверьте введённые данные!'
    //   );
    // }
    this.apiService.checkLogin(login, password).subscribe(
        res => console.log(res),
        error => console.log(error),
    );
  }

  public processRegistration(login: string, password: string): void {
    this.apiService.registerUser(login, password).subscribe(
        res => console.log(res),
        error => console.log(error),
    );
  }
}
