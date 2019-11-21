import { TaskTypeEnum } from '../enums/task-type.enum';
import { CoefInterfaceTask1, CoefInterfaceTask3 } from './coefInterfaceTask1';
import { Task1CalculationsInterface, Task3CalculationsInterface } from './calculations.interface';

export interface NavigationCalculationsInterface {
  taskNum: TaskTypeEnum;
  coefs: CoefInterfaceTask1 | CoefInterfaceTask3;
  results: Task1CalculationsInterface | Task3CalculationsInterface;
}
