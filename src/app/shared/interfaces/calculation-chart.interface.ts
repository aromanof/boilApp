export interface Task1TemperatureCalculationChartInterface {
  T: Task1ChartItemResults;
  Phi: Task1ChartItemResults
}

export interface Task3NozzleHeightCalculationChartInterface {
  sChangingList: Array<string>;
  vChangingList: Array<string>;
  resultNozzleHeightList: Array<number>;
}

export interface Task1ChartItemResults {
  startList: Array<number>,
  endList: Array<number>,
  resultTemperatureList: Array<string>,
  labels: Array<string>,
}
