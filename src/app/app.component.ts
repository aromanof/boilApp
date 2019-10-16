import { Component, OnInit } from '@angular/core';
import { ApiService } from './shared/services/api.service';
import { CatInterface } from './shared/interfaces/cat.interface';
import { Observable, BehaviorSubject } from 'rxjs';
import { CastExpr } from '@angular/compiler';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from './shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'diplomaFrontEndTest';
  public cats = new BehaviorSubject<CatInterface[]>([])

  constructor(
    private apiService: ApiService,
    private cookieService: CookieService,
    private userService: UserService,
    private router: Router,
  ) {}

  public ngOnInit() {
    this.checkToken();
  }

  private checkToken(): void {
    const token = this.cookieService.get('user-token');
    if (token) {
      this.apiService.verifyToken(token).subscribe(
        (userInfo) => {
          this.userService.currentUser = userInfo;
          this.router.navigate(['/home']);
        },
        (error) => {
          console.log(error);
          this.router.navigate(['/auth']);
        },
      );
    }
  }
}
