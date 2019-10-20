import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../shared/services/api.service';
import { CoefInterfaceTask1 } from '../../shared/interfaces/coefInterfaceTask1';
import { AlertService } from '../../shared/services/alert.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Task1CalculationsInterface } from '../../shared/interfaces/calculations.interface';
import { Chart } from 'chart.js';
import { MatTabChangeEvent } from '@angular/material';
import { Task1TemperatureCalculationChartInterface } from '../../shared/interfaces/calculation-chart.interface';

@Component({
  selector: 'app-calculation-task1',
  templateUrl: './calculation-with-tabs.component.html',
  styleUrls: ['./calculation-with-tabs.component.sass']
})
export class CalculationTask1Component implements OnInit {
  @Input() label: string;
  public calculationForm: FormGroup;
  public coefs: CoefInterfaceTask1;
  public coefsLoading = new BehaviorSubject<boolean>(true);
  public calculationResults: Task1CalculationsInterface;
  public chartCalculationResults: Task1TemperatureCalculationChartInterface;
  public onChartInit = new Subject<boolean>();

  constructor(
    private api: ApiService,
    private alert: AlertService,
  ) { }

  ngOnInit() {
    this.api.getCalculationsCoefficientsTask1().pipe(
      finalize(() => this.coefsLoading.next(false))
    ).subscribe(
      coefs => {
        this.coefs = coefs;
        this.createCalculationForm(coefs);
      },
      this.alert.handleError,
    );
  }

  private createCalculationForm(coefs: CoefInterfaceTask1): void {
    this.calculationForm = new FormGroup({
      G1: new FormControl(coefs.G1, Validators.required),
      G2: new FormControl(coefs.G2, Validators.required),
      T1: new FormControl(coefs.T1, Validators.required),
      T2: new FormControl(coefs.T2, Validators.required),
      Phi1: new FormControl(coefs.Phi1, Validators.required),
      Phi2: new FormControl(coefs.Phi2, Validators.required),
    })
  }

  public resetForm(): void {
    this.calculationResults = null;
    Object.keys(this.calculationForm.controls).forEach(key => {
      this.calculationForm.get(key).setValue('');
    });
  }

  public calculate(): void {
    this.calculationResults = null;
    this.api.calculateTask1(this.formCoefsObject()).subscribe((res) => {
        this.calculationResults = res;
    },
      (error) => this.alert.handleError(error.error)
    );

    this.api.calculateTemperatureChartTask1(
      this.calculationForm.get('T1').value,
      this.calculationForm.get('T2').value,
      this.calculationForm.get('G1').value,
      this.calculationForm.get('G2').value,
    ).subscribe(
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
