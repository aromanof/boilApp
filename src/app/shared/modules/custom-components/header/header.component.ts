import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { BehaviorSubject } from 'rxjs';
import { HeaderTabsEnum } from '../../../enums/header-tabs.enum';
import { HeaderRouteService } from '../../../services/header-route.service';

@Component({
  selector   : 'app-header',
  templateUrl: './header.component.html',
  styleUrls  : [ './header.component.sass' ],
})
export class HeaderComponent implements OnInit {
  @Output() public logOut: EventEmitter<any> = new EventEmitter();
  headerTabsEnum = HeaderTabsEnum;
  public constructor(
    public userService: UserService,
    private headerRouteService: HeaderRouteService,
  ) {}

  public ngOnInit(): void {}

  tabChanged(tab: HeaderTabsEnum): void {
    if (this.headerRouteService.selectedTab.value !== tab) {
      this.headerRouteService.selectedTab.next(tab);
    }
  }

  isTabActive(tab: HeaderTabsEnum): boolean {
    return this.headerRouteService.selectedTab.value === tab;
  }
}
