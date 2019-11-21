import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { TaskTypeEnum } from '../enums/task-type.enum';
import { HeaderRouteService } from './header-route.service';
import { HeaderTabsEnum } from '../enums/header-tabs.enum';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(
    private router: Router,
    private headerRouter: HeaderRouteService,
  ) { }

  navigateAndCalculateTask(taskNum: TaskTypeEnum, taskCoefs: any, calcResults: any): void {
    let navigationExtras: NavigationExtras = {
      queryParams:  {
        taskNum,
        coefs: JSON.stringify(taskCoefs),
        results: JSON.stringify(calcResults),
      }
    };
    this.headerRouter.selectNewTab(HeaderTabsEnum.Calculations);
    this.router.navigate(['/home/calculations'], navigationExtras);
  }

  mapObjectToString(obj: Object): any {
    Object.keys(obj).forEach(function(key){ obj[key] = obj[key].toString() });
    return obj;
  }
}
