import { Component, Input, OnInit } from '@angular/core';
import {ChartDataSets, ChartType} from 'chart.js';
import { Subject } from 'rxjs';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { filter } from 'rxjs/operators';
import {
  Task1TemperatureCalculationChartInterface,
  Task3NozzleHeightCalculationChartInterface
} from '../../../shared/interfaces/calculation-chart.interface';
import { TaskTypeEnum } from '../../../shared/enums/task-type.enum';

@Component({
  selector: 'app-calculation-chart',
  templateUrl: './calculation-chart.component.html',
  styleUrls: ['./calculation-chart.component.sass']
})
export class CalculationChartComponent implements OnInit {
  @Input() xAxisLabel: string;
  @Input() tabChanged: Subject<any>;
  @Input() calculationsResults: Task1TemperatureCalculationChartInterface | Task3NozzleHeightCalculationChartInterface;
  @Input() taskType: TaskTypeEnum;
  public barChartOptions = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{
        ticks: {
          beginAtZero: true,
        }
      }] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
    { type: 'bar', data: [], label: 'Начальная температура' },
    { type: 'bar', data: [], label: 'Конечная температура' },
    { borderWidth: 3, pointBorderWidth: 4, fill: false, type: 'line', data: [], label: 'Температура смеси' },
  ];

  constructor() {}

  ngOnInit() {
    this.tabChanged.pipe(
      filter(() => !!this.calculationsResults),
    ).subscribe(() => {
      if (this.taskType === TaskTypeEnum.ScruberParams) {
        this.barChartLabels = ['T1 + 10, T2', 'T1 + 5, T2', 'T1, T2', 'T1, T2 + 5', 'T1, T2 + 10'];
        // @ts-ignore
        this.barChartData[0].data = this.calculationsResults.startTemperatureList;
        this.barChartData[0].label = 'Начальная температура';
        // @ts-ignore
        this.barChartData[1].data = this.calculationsResults.endTemperatureList;
        this.barChartData[1].label = 'Конечная температура';
        // @ts-ignore
        this.barChartData[2] = { data: this.calculationsResults.resultTemperatureList, borderWidth: 3, pointBorderWidth: 4, fill: false, type: 'line', label: 'Температура смеси' };
      } else if (this.taskType === TaskTypeEnum.NozzleHeight) {
        this.barChartLabels = ['S + 10, V', 'S + 5, V', 'S, V', 'S, V + 0.2', 'S, V + 0.5'];
        // @ts-ignore
        this.barChartData[0] = {data: this.calculationsResults.vChangingList, label: 'Свободный объем насадки'};
        // @ts-ignore
        this.barChartData[1] = {data: this.calculationsResults.sChangingList, label: 'Поверхность насадки'};
        // @ts-ignore
        this.barChartData[2] = {data: this.calculationsResults.resultNozzleHeightList, borderWidth: 3, pointBorderWidth: 4, fill: false, type: 'line', label: 'Высота насадки'};
      }
    });
  }
}
