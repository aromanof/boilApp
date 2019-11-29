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
import { Chart1DataTypeEnum, Chart2DataTypeEnum } from '../../../shared/enums/chart-data-type.enum';

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
  chart2DataType = new FormControl();
  chart1DataTypeEnum = Chart1DataTypeEnum;
  chart2DataTypeEnum = Chart2DataTypeEnum;
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

  public checkChart1DataTypeChange(): void {
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

  public checkChart2DataTypeChange(): void {
    this.chart2DataType.valueChanges
      .pipe(filter(() => !!this.calculationsResults))
      .subscribe((value) => {
        const dataType = value === Chart2DataTypeEnum.Temperature ? 'T' : 'SV';
        this.buildChart2(dataType);
        setTimeout(() => {
          this.chartInstance.refresh();
        }, 0);
      });
  }

  ngOnInit() {
    this.checkChart1DataTypeChange();
    this.checkChart2DataTypeChange();
    this.chart1DataType.setValue(Chart1DataTypeEnum.Temperature);
    this.chart2DataType.setValue(Chart2DataTypeEnum.Temperature);
    this.tabChanged.pipe(
      filter(() => !!this.calculationsResults),
    ).subscribe(() => {
      if (this.taskType === TaskTypeEnum.ScruberParams) {
        const dataType = this.chart1DataType.value === Chart1DataTypeEnum.Temperature ? 'T' : 'Phi';
        this.buildChart1(dataType);
      } else if (this.taskType === TaskTypeEnum.NozzleHeight) {
        const dataType = this.chart2DataType.value === Chart2DataTypeEnum.Temperature ? 'T' : 'SV';
        this.buildChart2(dataType);
      }
    });
  }

  private getChart1LabelsByDataType(): {xLabel: string, yLabel: string, startChartLabel: string, endChartLabel: string, resultChartLabel: string, dataTypeLabel: string} {
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

  private getChart2LabelsByDataType(): {xLabel: string, yLeftLabel: string, yRightLabel: string, startChartLabel: string, endChartLabel: string, resultChartLabel: string, dataTypeLabelLeft: string, dataTypeLabelRight: string} {
    return {
      xLabel: this.chart2DataType.value === Chart2DataTypeEnum.Temperature
        ? 'Изменение начальной и конечной температур воды'
        : 'Изменение свободного объема и площади насадки',
      yLeftLabel: this.chart2DataType.value === Chart2DataTypeEnum.Temperature
        ? 'Температура, °C'
        : 'Размер насадки',
      yRightLabel: 'Высота насадки, м',
      startChartLabel: this.chart2DataType.value === Chart2DataTypeEnum.Temperature
        ? 'Начальная температура воды'
        : 'Площадь насадки',
      endChartLabel: this.chart2DataType.value === Chart2DataTypeEnum.Temperature
        ? 'Конечная температура воды'
        : 'Свободный объем насадки',
      resultChartLabel: this.chart2DataType.value === Chart2DataTypeEnum.Temperature
        ? 'Высота насадки'
        : 'Высота насадки',
      dataTypeLabelLeft: this.chart2DataType.value === Chart2DataTypeEnum.Temperature
        ? '°C'
        : '',
      dataTypeLabelRight: this.chart2DataType.value === Chart2DataTypeEnum.Temperature
        ? 'м'
        : '',
    }
  }

  private buildChart1(dataType): void {
    this.barChartOptions = {
      responsive: true,
      scales: { xAxes: [{
          scaleLabel: {
            display: true,
            labelString: this.getChart1LabelsByDataType().xLabel,
            fontSize: 22,
          },
        }], yAxes: [{
          scaleLabel: {
            display: true,
            labelString: this.getChart1LabelsByDataType().yLabel,
            fontSize: 22,
          },
          ticks: {
            beginAtZero: true,
            callback: (value) => {
              return value + this.getChart1LabelsByDataType().dataTypeLabel;
            },
          }
        }
      ] },
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
    this.barChartData[0].label = this.getChart1LabelsByDataType().startChartLabel;
    // @ts-ignore
    this.barChartData[1].data = this.calculationsResults[dataType].endList;
    this.barChartData[1].label = this.getChart1LabelsByDataType().endChartLabel;
    // @ts-ignore
    this.barChartData[2] = { data: this.calculationsResults[dataType].resultTemperatureList, borderWidth: 3, pointBorderWidth: 4, fill: false, type: 'line', label: this.getChart1LabelsByDataType(this.chart1DataType.value).resultChartLabel };
  }

  private buildChart2(dataType): void {
    this.barChartOptions = {
      responsive: true,
      scales: { xAxes: [{
          scaleLabel: {
            display: true,
            labelString: this.getChart2LabelsByDataType().xLabel,
            fontSize: 22,
          },
        }], yAxes: [{
          id: '1',
          position: 'left',
          scaleLabel: {
            display: true,
            labelString: this.getChart2LabelsByDataType().yLeftLabel,
            fontSize: 22,
          },
          ticks: {
            suggestedMax: 70,
            beginAtZero: true,
            callback: (value) => {
              return value + this.getChart2LabelsByDataType().dataTypeLabelLeft;
            },
          }
        }, {
          id: '2',
          position: 'right',
          scaleLabel: {
            display: true,
            labelString: this.getChart2LabelsByDataType().yRightLabel,
            fontSize: 22,
          },
          ticks: {
            suggestedMax: 3,
            beginAtZero: true,
            callback: (value) => {
              return value + this.getChart2LabelsByDataType().dataTypeLabelRight;
            },
          }
        }
      ]},
      plugins: {
        datalabels: {
          anchor: 'end',
          align: 'end',
        }
      }
    };

    this.barChartLabels = this.calculationsResults[dataType].labels;
    // @ts-ignore
    this.barChartData[0].data = this.calculationsResults[dataType].startList;
    this.barChartData[0].yAxisID = '1';
    this.barChartData[0].label = this.getChart2LabelsByDataType().startChartLabel;
    // @ts-ignore
    this.barChartData[1].data = this.calculationsResults[dataType].endList;
    this.barChartData[1].yAxisID = '1';
    this.barChartData[1].label = this.getChart2LabelsByDataType().endChartLabel;
    // @ts-ignore
    this.barChartData[2] = { yAxisID: '2', data: this.calculationsResults[dataType].resultTemperatureList, borderWidth: 3, pointBorderWidth: 5, fill: false, type: 'line', label: this.getChart2LabelsByDataType(this.chart2DataType.value).resultChartLabel };
  }
}
