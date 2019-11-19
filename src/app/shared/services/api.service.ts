import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { CatInterface } from '../interfaces/cat.interface';
import { Observable, of } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { UserRoles } from '../enums/user-roles.enum';
import { LoginResponseInterface, UserInterface, VerifyTokenResponseInterface } from '../interfaces/user.interface';
import { ExposedUserInterface } from '../interfaces/exposed-user.interface';
import { CoefInterfaceTask1, CoefInterfaceTask3 } from '../interfaces/coefInterfaceTask1';
import { Task1CalculationsInterface, Task3CalculationsInterface } from '../interfaces/calculations.interface';
import {
  Task1TemperatureCalculationChartInterface,
  Task3NozzleHeightCalculationChartInterface
} from '../interfaces/calculation-chart.interface';
import { HistoryInterface } from '../interfaces/history.interface';
import { TaskTypeEnum } from '../enums/task-type.enum';

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

  public checkLogin(login: string, password: string): Observable<LoginResponseInterface> {
    return this.http.post<any>(this.serverHost + '/user/login', {login, password}, this.httpOptions);
  }

  public registerUser(login: string, password: string, name: string, email: string): Observable<any> {
    return this.http.post<any>(this.serverHost + '/user/create', {login, password, name, email}, this.httpOptions);
  }

  public verifyToken(token: string): Observable<VerifyTokenResponseInterface> {
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

  public updateDisabledValueTask1(isDisabled: boolean): Observable<Task3CalculationsInterface> {
    return this.http.post<any>(this.serverHost + '/admin/disable-task1', {isDisabled}, this.httpOptions);
  }

  public updateDisabledValueTask3(isDisabled: boolean): Observable<Task3CalculationsInterface> {
    return this.http.post<any>(this.serverHost + '/admin/disable-task3', {isDisabled}, this.httpOptions);
  }

  public updateCoeficientsTask1(coefs: CoefInterfaceTask1): Observable<Task3CalculationsInterface> {
    return this.http.post<any>(this.serverHost + '/admin/update-task1', coefs, this.httpOptions);
  }

  public updateCoeficientsTask3(coefs: CoefInterfaceTask3): Observable<Task3CalculationsInterface> {
    return this.http.post<any>(this.serverHost + '/admin/update-task3', coefs, this.httpOptions);
  }

  public getUserHistory(): Observable<HistoryInterface[]> {
    return of([{
      userName: 'Alex',
      date: '12-10-2019',
      taskType: TaskTypeEnum.ScruberParams,
      calculationCoefficients: {
        disableInput: false,
        G1: '100',
        G2: '100',
        T1: '100',
        T2: '100',
        Phi1: '100',
        Phi2: '100',
        Pb: '100',
      }
    }, {
      userName: 'Peter',
      date: '10-11-2018',
      taskType: TaskTypeEnum.NozzleHeight,
      calculationCoefficients: {
        disableInput: false,
        L: '100',
        T1_1: '100',
        T1_2: '100',
        T2_1: '100',
        T2_2: '100',
        I1: '100',
        I2: '100',
        S: '100',
        V: '100',
        d: '100',
      },
    }])
  }
}
