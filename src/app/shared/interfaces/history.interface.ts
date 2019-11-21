import { CoefInterfaceTask1, CoefInterfaceTask3 } from './coefInterfaceTask1';
import { Task1CalculationsInterface, Task3CalculationsInterface } from './calculations.interface';
import { UserInterface } from './user.interface';

export interface HistoryInterface {
  documentsCount: number;
  history: HistoryInfoInterface[];
}

export interface HistoryInfoInterface {
  user?: UserInterface;
  date?: string;
  calculationCoefficients: CoefInterfaceTask1 | CoefInterfaceTask3;
  calculationResults: Task1CalculationsInterface | Task3CalculationsInterface;
}
