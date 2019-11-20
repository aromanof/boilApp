import { Component, Input, OnInit } from '@angular/core';
import { CoefInterfaceTask1 } from '../../../interfaces/coefInterfaceTask1';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskTypeEnum } from '../../../enums/task-type.enum';
import { Task1CalculationsInterface } from '../../../interfaces/calculations.interface';

@Component({
  selector: 'app-task1-group',
  templateUrl: './task1-group.component.html',
  styleUrls: ['./task1-group.component.sass']
})
export class Task1GroupComponent implements OnInit {
  @Input() task1Coefficients: CoefInterfaceTask1;
  @Input() task1CalculationResults: Task1CalculationsInterface;
  public calculationForm: FormGroup;
  taskTypeEnum = TaskTypeEnum;
  constructor() { }

  ngOnInit() {
    this.createCalculationForm(this.task1Coefficients);
  }

  private createCalculationForm(coefs: CoefInterfaceTask1): void {
    this.calculationForm = new FormGroup({
      G1: new FormControl({ value: coefs.G1, disabled: true }, Validators.required),
      G2: new FormControl({ value: coefs.G2, disabled: true }, Validators.required),
      T1: new FormControl({ value: coefs.T1, disabled: true }, Validators.required),
      T2: new FormControl({ value: coefs.T2, disabled: true }, Validators.required),
      Phi1: new FormControl({ value: coefs.Phi1, disabled: true }, Validators.required),
      Phi2: new FormControl({ value: coefs.Phi2, disabled: true }, Validators.required),
    })
  }

}
