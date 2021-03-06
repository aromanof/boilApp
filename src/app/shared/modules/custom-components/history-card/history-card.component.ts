import { Component, Input, OnInit } from '@angular/core';
import { HistoryInfoInterface } from '../../../interfaces/history.interface';
import { TaskTypeEnum } from '../../../enums/task-type.enum';

@Component({
  selector: 'app-history-card',
  templateUrl: './history-card.component.html',
  styleUrls: ['./history-card.component.sass']
})
export class HistoryCardComponent implements OnInit {
  @Input() historyInfo: HistoryInfoInterface;
  taskType = TaskTypeEnum;
  constructor() { }

  ngOnInit() {
  }

  getTaskTypeDescription(): string {
    return +this.historyInfo.calculationCoefficients.taskNum === TaskTypeEnum.ScruberParams
      ? 'Расчет параметров водонагревателя'
      : 'Расчет высоты насадки скрубера';
  }
}
