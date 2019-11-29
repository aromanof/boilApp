export interface Task1TemperatureCalculationChartInterface {
  T: Task1ChartItemResults;
  Phi: Task1ChartItemResults
}

export interface Task3NozzleHeightCalculationChartInterface {
  T: Task1ChartItemResults;
  SV: Task1ChartItemResults
}

export interface Task1ChartItemResults {
  startList: Array<number>;
  endList: Array<number>;
  resultTemperatureList: Array<string>;
  labels: Array<string>;
}
