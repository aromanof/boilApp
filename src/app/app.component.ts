import { Component, OnInit } from '@angular/core';
import { ApiService } from './shared/services/api.service';
import { CatInterface } from './shared/interfaces/cat.interface';
import { Observable, BehaviorSubject } from 'rxjs';
import { CastExpr } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'diplomaFrontEndTest';
  public cats = new BehaviorSubject<CatInterface[]>([])

  constructor(private apiService: ApiService) {}

  public ngOnInit() {
    this.apiService.getAllCats().subscribe(
      res => this.cats.next(res),
      error => console.log(error),
    );
  }
}
