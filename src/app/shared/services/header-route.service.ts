import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HeaderTabsEnum } from '../enums/header-tabs.enum';

@Injectable({
  providedIn: 'root'
})
export class HeaderRouteService {
  selectedTab = new BehaviorSubject<HeaderTabsEnum>(HeaderTabsEnum.Calculations);
  constructor() { }

  selectNewTab(tab: HeaderTabsEnum) {
    this.selectedTab.next(tab);
  }
}
