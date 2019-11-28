import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {ChartDataSets, ChartType} from 'chart.js';
import { Subject } from 'rxjs';
import { BaseChartDirective, Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { filter, switchMap, withLatestFrom } from 'rxjs/operators';
import {
  Task1TemperatureCalculationChartInterface,
  Task3NozzleHeightCalculationChartInterface
} from '../../../shared/interfaces/calculation-chart.interface';
import { TaskTypeEnum } from '../../../shared/enums/task-type.enum';
import { FormControl } from '@angular/forms';
import { Chart1DataTypeEnum } from '../../../shared/enums/chart-data-type.enum';

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
  @ViewChild(BaseChartDirective, { static: false }) private chartInstance;
  chart1DataType = new FormControl();
  chart1DataTypeEnum = Chart1DataTypeEnum;
  taskTypeEnum = TaskTypeEnum;
  public barChartOptions = {};
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

  public checkChartDataTypeChange(): void {
    this.chart1DataType.valueChanges
      .pipe(filter(() => !!this.calculationsResults))
      .subscribe((value) => {
        const dataType = value === Chart1DataTypeEnum.Temperature ? 'T' : 'Phi';
        this.buildChart1(dataType);
        setTimeout(() => {
          this.chartInstance.refresh();
        }, 0);
      });
  }

  ngOnInit() {
    this.checkChartDataTypeChange();
    this.chart1DataType.setValue(Chart1DataTypeEnum.Temperature);
    this.tabChanged.pipe(
      filter(() => !!this.calculationsResults),
    ).subscribe(() => {
      if (this.taskType === TaskTypeEnum.ScruberParams) {
        const dataType = this.chart1DataType.value === Chart1DataTypeEnum.Temperature ? 'T' : 'Phi';
        this.buildChart1(dataType);
      } else if (this.taskType === TaskTypeEnum.NozzleHeight) {
        this.barChartOptions = {
          responsive: true,
          scales: { xAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'Изменение свободного объема и площади насадки',
                fontSize: 22,
              },
            }], yAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'Высота насадки, м',
                fontSize: 22,
              },
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

  private getChart1LabelsByDataType(chart1DataType: Chart1DataTypeEnum): {xLabel: string, yLabel: string, startChartLabel: string, endChartLabel: string, resultChartLabel: string, dataTypeLabel: string} {
    const dataType = this.chart1DataType.value === Chart1DataTypeEnum.Temperature ? 'T' : 'Phi';
    return {
      xLabel: this.chart1DataType.value === Chart1DataTypeEnum.Temperature
        ? 'Изменение начальной и конечной температур'
        : 'Изменение начальной и конечной влажности',
      yLabel: this.chart1DataType.value === Chart1DataTypeEnum.Temperature
        ? 'Температура, °C'
        : 'Влажность, %',
      startChartLabel: this.chart1DataType.value === Chart1DataTypeEnum.Temperature
        ? 'Начальная температура'
        : 'Начальная влажность',
      endChartLabel: this.chart1DataType.value === Chart1DataTypeEnum.Temperature
        ? 'Конечная температура'
        : 'Конечная влажность',
      resultChartLabel: this.chart1DataType.value === Chart1DataTypeEnum.Temperature
        ? 'Температура смеси'
        : 'Относительная влажность смеси',
      dataTypeLabel: this.chart1DataType.value === Chart1DataTypeEnum.Temperature
        ? '°C'
        : '%',
    }
  }

  private buildChart1(dataType): void {
    this.barChartOptions = {
      responsive: true,
      scales: { xAxes: [{
          scaleLabel: {
            display: true,
            labelString: this.getChart1LabelsByDataType(this.chart1DataType.value).xLabel,
            fontSize: 22,
          },
        }], yAxes: [{
          scaleLabel: {
            display: true,
            labelString: this.getChart1LabelsByDataType(this.chart1DataType.value).yLabel,
            fontSize: 22,
          },
          ticks: {
            beginAtZero: true,
            callback: (value) => {
              return value + this.getChart1LabelsByDataType(this.chart1DataType.value).dataTypeLabel;
            },
          }
        }] },
      plugins: {
        datalabels: {
          anchor: 'end',
          align: 'end',
        }
      }
    };
    this.barChartLabels = (this.calculationsResults as Task1TemperatureCalculationChartInterface)[dataType].labels;
    // @ts-ignore
    this.barChartData[0].data = this.calculationsResults[dataType].startList;
    this.barChartData[0].label = this.getChart1LabelsByDataType(this.chart1DataType.value).startChartLabel;
    // @ts-ignore
    this.barChartData[1].data = this.calculationsResults[dataType].endList;
    this.barChartData[1].label = this.getChart1LabelsByDataType(this.chart1DataType.value).endChartLabel;
    // @ts-ignore
    this.barChartData[2] = { data: this.calculationsResults[dataType].resultTemperatureList, borderWidth: 3, pointBorderWidth: 4, fill: false, type: 'line', label: this.getChart1LabelsByDataType(this.chart1DataType.value).resultChartLabel };
  }
}
