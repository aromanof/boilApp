import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {MockService} from "../../shared/services/mock.service";
import {UserService} from "../../shared/services/user.service";
import {AlertService} from "../../shared/services/alert.service";
import {ApiService} from "../../shared/services/api.service";
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../shared/services/auth.service';

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
      private auth: AuthService,
  ) { }

  ngOnInit() {
    this.createLoginForm();
  }

  processLogin(): void {
    this.apiService.checkLogin(
      this.getLoginControl().value,
      this.getPasswordControl().value
    ).subscribe(
      loginInfo => {
        if (loginInfo.isValid) {
          this.user.currentUser = loginInfo.user;
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

  goToRegistration(): void {
    this.auth.isLoginPageOpen = false;
  }

  createLoginForm(): void {
    this.loginForm = new FormGroup({
      login: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  getLoginControl(): AbstractControl {
    return this.loginForm.get('login');
  }

  getPasswordControl(): AbstractControl {
    return this.loginForm.get('password');
  }
}
