import { TaskTypeEnum } from '../enums/task-type.enum';
import { CoefInterfaceTask1, CoefInterfaceTask3 } from './coefInterfaceTask1';
import { Task1CalculationsInterface, Task3CalculationsInterface } from './calculations.interface';

export interface HistoryInterface {
  userName: string;
  date: string;
  taskType: TaskTypeEnum,
  calculationCoefficients: CoefInterfaceTask1 | CoefInterfaceTask3;
  calculationResults: Task1CalculationsInterface | Task3CalculationsInterface;
}
