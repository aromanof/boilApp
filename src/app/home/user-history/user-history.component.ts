import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { HistoryInterface } from '../../shared/interfaces/history.interface';

@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.sass']
})
export class UserHistoryComponent implements OnInit {
  userHistory: HistoryInterface[];
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getUserHistory();
  }

  private getUserHistory(): void {
    this.apiService.getUserHistory().subscribe(
      res => this.userHistory = res,
    );
  }

}
