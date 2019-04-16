import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CatInterface } from '../interfaces/cat.interface';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  public getAllCats(): Observable<CatInterface[]> {
    return this.http.get<CatInterface[]>('http://localhost:8000/api/cats').pipe(
      pluck('cats'),
    );
  }
}
