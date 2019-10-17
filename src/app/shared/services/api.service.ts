import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { CatInterface } from '../interfaces/cat.interface';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { UserRoles } from '../enums/user-roles.enum';
import { UserInterface } from '../interfaces/user.interface';
import { ExposedUserInterface } from '../interfaces/exposed-user.interface';

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

  public checkLogin(login: string, password: string): Observable<{isValid: boolean, token?: string, user: UserInterface}> {
    return this.http.post<any>('http://localhost:8000/user/login', {login, password}, this.httpOptions);
  }

  public registerUser(login: string, password: string, name: string, email: string): Observable<any> {
    return this.http.post<any>('http://localhost:8000/user/create', {login, password, name, email}, this.httpOptions);
  }

  public verifyToken(token: string): Observable<UserInterface> {
    return this.http.post<any>('http://localhost:8000/user/verifyToken', {token}, this.httpOptions);
  }
}
