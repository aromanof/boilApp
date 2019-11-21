import { Component, Input, OnInit } from '@angular/core';
import { CoefInterfaceTask3 } from '../../../interfaces/coefInterfaceTask1';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Task3CalculationsInterface } from '../../../interfaces/calculations.interface';
import { TaskTypeEnum } from '../../../enums/task-type.enum';
import { NavigationExtras, Router } from '@angular/router';
import { HelperService } from '../../../services/helper.service';

@Component({
  selector: 'app-task3-group',
  templateUrl: './task3-group.component.html',
  styleUrls: ['./task3-group.component.sass']
})
export class Task3GroupComponent implements OnInit {
  @Input() task3Coefficients: CoefInterfaceTask3;
  @Input() task3CalculationResults: Task3CalculationsInterface;
  public calculationForm: FormGroup;

  taskTypeEnum = TaskTypeEnum;

  constructor(
    private router: Router,
    private helper: HelperService,
  ) { }

  ngOnInit() {
    this.createCalculationForm(this.task3Coefficients);
  }

  private createCalculationForm(coefs: CoefInterfaceTask3): void {
    this.calculationForm = new FormGroup({
      T1_1: new FormControl({ value: coefs.T1_1, disabled: true }, Validators.required),
      T1_2: new FormControl({ value: coefs.T1_2, disabled: true }, Validators.required),
      T2_1: new FormControl({ value: coefs.T2_1, disabled: true }, Validators.required),
      T2_2: new FormControl({ value: coefs.T2_2, disabled: true }, Validators.required),
      I1: new FormControl({ value: coefs.I1, disabled: true }, Validators.required),
      I2: new FormControl({ value: coefs.I2, disabled: true }, Validators.required),
      L: new FormControl({ value: coefs.L, disabled: true }, Validators.required),
      S: new FormControl({ value: coefs.S, disabled: true }, Validators.required),
      V: new FormControl({ value: coefs.V, disabled: true }, Validators.required),
      d: new FormControl({ value: coefs.d, disabled: true }, Validators.required),
    });
  }

  calculate() {
    this.helper.navigateAndCalculateTask(TaskTypeEnum.NozzleHeight, this.task3Coefficients, this.task3CalculationResults)
  }
}
