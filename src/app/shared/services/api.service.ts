import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { CatInterface } from '../interfaces/cat.interface';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  constructor(private http: HttpClient) { }

  public getAllCats(): Observable<CatInterface[]> {
    return this.http.get<CatInterface[]>('http://localhost:8000/api/cats').pipe(
      pluck('cats'),
    );
  }

  public checkLogin(login: string, password: string): Observable<any> {
    return this.http.post<any>('http://localhost:8000/login', {login, password}, this.httpOptions);
  }
}
