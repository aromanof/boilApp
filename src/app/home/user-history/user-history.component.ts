import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { HistoryInterface } from '../../shared/interfaces/history.interface';
import { UserService } from '../../shared/services/user.service';
import { PageEvent } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { HeaderRouteService } from '../../shared/services/header-route.service';
import { HeaderTabsEnum } from '../../shared/enums/header-tabs.enum';

@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.sass']
})
export class UserHistoryComponent implements OnInit {
  userHistory = new BehaviorSubject<HistoryInterface>({documentsCount: 1, history: []});
  historyFetched: boolean = false;
  currentPage = 1;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  tabsEnum = HeaderTabsEnum;
  constructor(
    private apiService: ApiService,
    private user: UserService,
    private headerRouter: HeaderRouteService,
  ) { }

  ngOnInit() {
    this.fetchUserHistory(this.currentPage, this.pageSize);
  }

  getNextPage(page: PageEvent) {
    this.currentPage = page.pageIndex + 1;
    this.pageSize = page.pageSize;
    this.fetchUserHistory(this.currentPage, this.pageSize);
  }

  fetchUserHistory(page: number, perPage: number): void {
    this.apiService.getUserHistory(this.user.currentUser.userId, page, perPage).pipe().subscribe(
      res => {
        this.userHistory.next(res);
        this.historyFetched = true;
      },
      () => this.historyFetched = true,
    );
  }
}
