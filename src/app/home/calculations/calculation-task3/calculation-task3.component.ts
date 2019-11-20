import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CoefInterfaceTask1, CoefInterfaceTask3 } from '../../../shared/interfaces/coefInterfaceTask1';
import { BehaviorSubject, Subject } from 'rxjs';
import { Task1CalculationsInterface, Task3CalculationsInterface } from '../../../shared/interfaces/calculations.interface';
import { ApiService } from '../../../shared/services/api.service';
import { AlertService } from '../../../shared/services/alert.service';
import { finalize } from 'rxjs/operators';
import { MatTabChangeEvent } from '@angular/material';
import {
  Task1TemperatureCalculationChartInterface,
  Task3NozzleHeightCalculationChartInterface
} from '../../../shared/interfaces/calculation-chart.interface';
import { TaskTypeEnum } from '../../../shared/enums/task-type.enum';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-calculation-task3',
  templateUrl: './calculation-task3.component.html',
  styleUrls: ['./calculation-task3.component.sass']
})
export class CalculationTask3Component implements OnInit {
  @Input() label: string;
  public calculationForm: FormGroup;
  public coefs: CoefInterfaceTask3;
  public coefsLoading = new BehaviorSubject<boolean>(true);
  public calculationResults: Task3CalculationsInterface;
  public onChartInit = new Subject<boolean>();
  public chartCalculationResults: Task3NozzleHeightCalculationChartInterface;

  taskTypeEnum = TaskTypeEnum;

  constructor(
    private api: ApiService,
    private alert: AlertService,
    private user: UserService,
  ) { }

  ngOnInit() {
    this.api.getCalculationsCoefficientsTask3().pipe(
      finalize(() => this.coefsLoading.next(false))
    ).subscribe(
      coefs => {
        this.coefs = coefs;
        this.createCalculationForm(coefs);
      },
      this.alert.handleError,
    );
  }

  private createCalculationForm(coefs: CoefInterfaceTask3): void {
    this.calculationForm = new FormGroup({
      T1_1: new FormControl({ value: coefs.T1_1, disabled: coefs.disableInput }, Validators.required),
      T1_2: new FormControl({ value: coefs.T1_2, disabled: coefs.disableInput }, Validators.required),
      T2_1: new FormControl({ value: coefs.T2_1, disabled: coefs.disableInput }, Validators.required),
      T2_2: new FormControl({ value: coefs.T2_2, disabled: coefs.disableInput }, Validators.required),
      I1: new FormControl({ value: coefs.I1, disabled: coefs.disableInput }, Validators.required),
      I2: new FormControl({ value: coefs.I2, disabled: coefs.disableInput }, Validators.required),
      L: new FormControl({ value: coefs.L, disabled: coefs.disableInput }, Validators.required),
      S: new FormControl({ value: coefs.S, disabled: coefs.disableInput }, Validators.required),
      V: new FormControl({ value: coefs.V, disabled: coefs.disableInput }, Validators.required),
      d: new FormControl({ value: coefs.d, disabled: coefs.disableInput }, Validators.required),
    });
  }

  public resetForm(): void {
    this.calculationResults = null;
    Object.keys(this.calculationForm.controls).forEach(key => {
      this.calculationForm.get(key).setValue('');
    });
  }

  public calculate(): void {
    this.calculationResults = null;
    this.api.calculateTask3(this.formCoefsObject(), this.user.currentUser.userId.toString()).subscribe((res) => {
        this.calculationResults = res;
      },
      (error) => this.alert.handleError(error.error));

    this.api.calculateNozzleSurfaceChartTask3(this.formCoefsObject()).subscribe(
      res => this.chartCalculationResults = res,
      error => this.alert.handleError(error.error)
    );
  }

  formCoefsObject(): any {
    const coefsObject = {};
    Object.keys(this.calculationForm.controls).forEach(key => {
      coefsObject[key] = this.calculationForm.get(key).value;
    });
    return coefsObject;
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    if(tabChangeEvent.index === 1) {
      this.onChartInit.next(true);
    }
  }
}
