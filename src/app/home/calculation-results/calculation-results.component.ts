import { Component, Input, OnInit } from '@angular/core';
import { Task1CalculationsInterface, Task3CalculationsInterface } from '../../shared/interfaces/calculations.interface';

export type TaskType = 'Task1' | 'Task3';

@Component({
  selector: 'app-calculation-results',
  templateUrl: './calculation-results.component.html',
  styleUrls: ['./calculation-results.component.sass']
})
export class CalculationResultsComponent implements OnInit {
  @Input() calculationResults: Task1CalculationsInterface | Task3CalculationsInterface;
  @Input() taskType: TaskType;

  constructor() { }

  ngOnInit() {
  }

}
