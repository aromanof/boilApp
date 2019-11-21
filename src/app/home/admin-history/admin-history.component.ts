import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HistoryInterface } from '../../shared/interfaces/history.interface';
import { ApiService } from '../../shared/services/api.service';
import { UserService } from '../../shared/services/user.service';
import { PageEvent } from '@angular/material';
import { HeaderRouteService } from '../../shared/services/header-route.service';
import { HeaderTabsEnum } from '../../shared/enums/header-tabs.enum';

@Component({
  selector: 'app-admin-history',
  templateUrl: './admin-history.component.html',
  styleUrls: ['./admin-history.component.sass']
})
export class AdminHistoryComponent implements OnInit {
  adminHistory = new BehaviorSubject<HistoryInterface>({documentsCount: 1, history: []});
  historyFetched: boolean = false;
  currentPage = 1;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  tabsEnum = HeaderTabsEnum;
  constructor(
    private apiService: ApiService,
    private headerRouter: HeaderRouteService,
  ) { }

  ngOnInit() {
    this.fetchAdminHistory(this.currentPage, this.pageSize);
  }

  getNextPage(page: PageEvent) {
    this.currentPage = page.pageIndex + 1;
    this.pageSize = page.pageSize;
    this.fetchAdminHistory(this.currentPage, this.pageSize);
  }

  fetchAdminHistory(page: number, perPage: number): void {
    this.apiService.getAdminHistory(page, perPage).pipe().subscribe(
      res => {
        this.adminHistory.next(res);
        this.historyFetched = true;
      },
      () => this.historyFetched = true,
    );
  }

}
