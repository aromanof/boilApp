import { Component, Input, OnInit } from '@angular/core';
import { TaskTypeEnum } from '../../../enums/task-type.enum';
import { Task1CalculationsInterface, Task3CalculationsInterface } from '../../../interfaces/calculations.interface';

@Component({
  selector: 'app-calculation-results',
  templateUrl: './calculation-results.component.html',
  styleUrls: ['./calculation-results.component.sass']
})
export class CalculationResultsComponent implements OnInit {
  @Input() calculationResults: Task1CalculationsInterface | Task3CalculationsInterface;
  @Input() taskType: TaskTypeEnum;
  taskTypeEnum = TaskTypeEnum;
  constructor() { }

  ngOnInit() {
  }

}
