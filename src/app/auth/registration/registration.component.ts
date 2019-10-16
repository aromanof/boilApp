import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ApiService } from '../../shared/services/api.service';
import { AlertService } from '../../shared/services/alert.service';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.sass']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  constructor(
    private apiService: ApiService,
    private cookieService: CookieService,
    private alert: AlertService,
    private router: Router,
    private auth: AuthService,
  ) { }

  ngOnInit() {
    this.createRegistrationForm();
  }

  processRegistration(): void {
    this.apiService.registerUser(
      this.getLoginControl().value,
      this.getPasswordControl().value,
      this.getNameControl().value,
      this.getEmailControl().value,
    ).subscribe(
      res => console.log(res),
      error => this.alert.handleError(error.error || error),
    );
  }

  goToLogin(): void {
    this.auth.isLoginPageOpen = true;
  }

  createRegistrationForm(): void {
    this.registrationForm = new FormGroup({
      login: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  getLoginControl(): AbstractControl {
    return this.registrationForm.get('login');
  }

  getPasswordControl(): AbstractControl {
    return this.registrationForm.get('password');
  }

  getNameControl(): AbstractControl {
    return this.registrationForm.get('name');
  }

  getEmailControl(): AbstractControl {
    return this.registrationForm.get('email');
  }
}
