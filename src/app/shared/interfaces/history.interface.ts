import { TaskTypeEnum } from '../enums/task-type.enum';
import { CoefInterfaceTask1, CoefInterfaceTask3 } from './coefInterfaceTask1';

export interface HistoryInterface {
  userName: string;
  date: string;
  taskType: TaskTypeEnum,
  calculationCoefficients: CoefInterfaceTask1 | CoefInterfaceTask3;
}
