import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Subject } from 'rxjs';
import { Color, Label } from 'ng2-charts';
import { filter } from 'rxjs/operators';
import {
  Task1TemperatureCalculationChartInterface,
  Task3NozzleHeightCalculationChartInterface
} from '../../../shared/interfaces/calculation-chart.interface';
import { TaskType } from '../calculation-results/calculation-results.component';

@Component({
  selector: 'app-calculation-chart',
  templateUrl: './calculation-chart.component.html',
  styleUrls: ['./calculation-chart.component.sass']
})
export class CalculationChartComponent implements OnInit {
  @Input() xAxisLabel: string;
  @Input() tabChanged: Subject<any>;
  @Input() calculationsResults: Task1TemperatureCalculationChartInterface | Task3NozzleHeightCalculationChartInterface;
  @Input() taskType: TaskType;
  public lineChartData: ChartDataSets[];
  public lineChartLabels: Label[];
  public lineChartOptions = {
    responsive: true,
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];

  constructor() {}

  ngOnInit() {
    this.tabChanged.pipe(
      filter(() => !!this.calculationsResults),
    ).subscribe(() => {
      if (this.taskType === 'Task1') {
        // @ts-ignore
        this.lineChartData = [{data: this.calculationsResults.startTemperatureList, label: 'Начальная температура'}, {data: this.calculationsResults.endTemperatureList, label: 'Конечная температура'}];
        // @ts-ignore
        this.lineChartLabels = this.calculationsResults.resultTemperatureList;
      } else if (this.taskType === 'Task3') {
        // @ts-ignore
        this.lineChartData = [{data: this.calculationsResults.resultNozzleHeightList, label: 'Высота хордовой насадки'}];
        // @ts-ignore
        this.lineChartLabels = this.calculationsResults.sChangingList;
      }
    });
  }

}
