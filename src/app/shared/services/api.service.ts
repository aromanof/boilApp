import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { CatInterface } from '../interfaces/cat.interface';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { UserRoles } from '../enums/user-roles.enum';
import { UserInterface } from '../interfaces/user.interface';
import { ExposedUserInterface } from '../interfaces/exposed-user.interface';
import { CoefInterfaceTask1, CoefInterfaceTask3 } from '../interfaces/coefInterfaceTask1';
import { Task1CalculationsInterface, Task3CalculationsInterface } from '../interfaces/calculations.interface';
import {
  Task1TemperatureCalculationChartInterface,
  Task3NozzleHeightCalculationChartInterface
} from '../interfaces/calculation-chart.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private serverHost = 'http://localhost:8000';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  constructor(private http: HttpClient) { }

  public checkLogin(login: string, password: string): Observable<{isValid: boolean, token?: string, user: UserInterface}> {
    return this.http.post<any>(this.serverHost + '/user/login', {login, password}, this.httpOptions);
  }

  public registerUser(login: string, password: string, name: string, email: string): Observable<any> {
    return this.http.post<any>(this.serverHost + '/user/create', {login, password, name, email}, this.httpOptions);
  }

  public verifyToken(token: string): Observable<UserInterface> {
    return this.http.post<any>(this.serverHost + '/user/verifyToken', {token}, this.httpOptions);
  }

  public getCalculationsCoefficientsTask1(): Observable<CoefInterfaceTask1> {
    return this.http.post<any>(this.serverHost + '/calculations/coefficients1', {}, this.httpOptions);
  }

  public getCalculationsCoefficientsTask3(): Observable<CoefInterfaceTask3> {
    return this.http.post<any>(this.serverHost + '/calculations/coefficients3', {}, this.httpOptions);
  }

  public calculateTask1(coefs: CoefInterfaceTask1): Observable<Task1CalculationsInterface> {
    return this.http.post<any>(this.serverHost + '/calculations/calculate-task1', coefs, this.httpOptions);
  }

  public calculateTemperatureChartTask1(T1: number, T2: number, G1: number, G2: number): Observable<Task1TemperatureCalculationChartInterface> {
    return this.http.post<any>(this.serverHost + '/chart/task1-temperature', {T1, T2, G1, G2}, this.httpOptions);
  }

  public calculateNozzleSurfaceChartTask3(coefs: CoefInterfaceTask3): Observable<Task3NozzleHeightCalculationChartInterface> {
    return this.http.post<any>(this.serverHost + '/chart/task3-nozzle-surface', coefs, this.httpOptions);
  }

  public calculateTask3(coefs: CoefInterfaceTask3): Observable<Task3CalculationsInterface> {
    return this.http.post<any>(this.serverHost + '/calculations/calculate-task3', coefs, this.httpOptions);
  }
}
