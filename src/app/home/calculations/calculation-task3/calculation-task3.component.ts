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

  constructor(
    private api: ApiService,
    private alert: AlertService,
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
      T1_1: new FormControl(coefs.T1_1, Validators.required),
      T1_2: new FormControl(coefs.T1_2, Validators.required),
      T2_1: new FormControl(coefs.T2_1, Validators.required),
      T2_2: new FormControl(coefs.T2_2, Validators.required),
      I1: new FormControl(coefs.I1, Validators.required),
      I2: new FormControl(coefs.I2, Validators.required),
      L: new FormControl(coefs.L, Validators.required),
      S: new FormControl(coefs.S, Validators.required),
      V: new FormControl(coefs.V, Validators.required),
      d: new FormControl(coefs.d, Validators.required),
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
    this.api.calculateTask3(this.formCoefsObject()).subscribe((res) => {
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
