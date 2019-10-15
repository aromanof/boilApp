import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {MockService} from "../shared/services/mock.service";
import {UserService} from "../shared/services/user.service";
import {AlertService} from "../shared/services/alert.service";
import {ApiService} from "../shared/services/api.service";
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  constructor(
      private router: Router,
      private mockService: MockService,
      private user: UserService,
      private alert: AlertService,
      private apiService: ApiService,
      private cookieService: CookieService,
  ) { }

  ngOnInit() {
    this.checkToken();
    this.createLoginForm();
  }

  private checkToken(): void {
    const token = this.cookieService.get('user-token');

    if (token) {
      this.apiService.verifyToken(token).subscribe(
        (userInfo) => console.log(userInfo),
      );
    }
  }

  public processLogin(): void {
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
    this.apiService.checkLogin(this.getLoginControl().value, this.getPasswordControl().value).subscribe(
        loginInfo => {
          if (loginInfo.isValid) {
            this.cookieService.set('user-token', loginInfo.token);
            //fix routing
            this.router.navigate(['../home']);
          } else {
            this.alert.showErrorMessage('Не правильный логин или пароль');
          }
        },
        error => console.log(error),
    );
  }

  createLoginForm(): void {
    this.loginForm = new FormGroup({
      login: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  processRegistration(): void {
    this.apiService.registerUser(this.getLoginControl().value, this.getPasswordControl().value).subscribe(
        res => console.log(res),
      (error) => this.alert.handleError(error.error || error),
    );
  }

  getLoginControl(): AbstractControl {
    return this.loginForm.get('login');
  }

  getPasswordControl(): AbstractControl {
    return this.loginForm.get('password');
  }
}
