import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../shared/services/api.service';
import { CoefInterfaceTask1, CoefInterfaceTask3 } from '../../../shared/interfaces/coefInterfaceTask1';
import { AlertService } from '../../../shared/services/alert.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import {
  Task1CalculationsInterface,
  Task3CalculationsInterface
} from '../../../shared/interfaces/calculations.interface';
import { Chart } from 'chart.js';
import { MatTabChangeEvent } from '@angular/material';
import { Task1TemperatureCalculationChartInterface } from '../../../shared/interfaces/calculation-chart.interface';
import { TaskTypeEnum } from '../../../shared/enums/task-type.enum';
import { UserService } from '../../../shared/services/user.service';
import { DateService } from '../../../shared/services/date.service';
import { NavigationCalculationsInterface } from '../../../shared/interfaces/navigation-calculations.interface';

@Component({
  selector: 'app-calculation-task1',
  templateUrl: './calculation-with-tabs.component.html',
  styleUrls: ['./calculation-with-tabs.component.sass']
})
export class CalculationTask1Component implements OnInit {
  @Input() label: string;
  @Input() calculations: NavigationCalculationsInterface;
  public calculationForm: FormGroup;
  public coefs: CoefInterfaceTask1;
  public coefsLoading = new BehaviorSubject<boolean>(true);
  public calculationResults: Task1CalculationsInterface;
  public chartCalculationResults: Task1TemperatureCalculationChartInterface;
  public onChartInit = new Subject<boolean>();

  taskTypeEnum = TaskTypeEnum;

  constructor(
    private api: ApiService,
    private alert: AlertService,
    private user: UserService,
    private dateService: DateService,
  ) { }

  ngOnInit() {
    if (this.calculations && +this.calculations.taskNum === TaskTypeEnum.ScruberParams) {
      this.coefs = this.calculations.coefs as unknown as CoefInterfaceTask1;
      this.createCalculationForm(this.coefs);
      this.calculationResults = this.calculations.results as unknown as Task1CalculationsInterface;
      this.calculateChart();
      this.coefsLoading.next(false);
    } else {
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
  }

  private createCalculationForm(coefs: CoefInterfaceTask1): void {
    this.calculationForm = new FormGroup({
      G1: new FormControl({ value: coefs.G1, disabled: coefs.disableInput }, Validators.required),
      G2: new FormControl({ value: coefs.G2, disabled: coefs.disableInput }, Validators.required),
      T1: new FormControl({ value: coefs.T1, disabled: coefs.disableInput }, Validators.required),
      T2: new FormControl({ value: coefs.T2, disabled: coefs.disableInput }, Validators.required),
      Phi1: new FormControl({ value: coefs.Phi1, disabled: coefs.disableInput }, Validators.required),
      Phi2: new FormControl({ value: coefs.Phi2, disabled: coefs.disableInput }, Validators.required),
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
    this.api.calculateTask1(this.formCoefsObject(), this.user.currentUser.userId, this.dateService.getCurrentDate()).subscribe((res) => {
        this.calculationResults = res;
    },
      (error) => this.alert.handleError(error.error)
    );

  }

  calculateChart(): void {
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
