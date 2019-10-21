import { Component, OnInit } from '@angular/core';
import { HeaderRouteService } from '../shared/services/header-route.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  constructor(
    private headerRouteService: HeaderRouteService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.initTabChangeListener();
  }

  initTabChangeListener(): void {
    this.headerRouteService.selectedTab.subscribe(
      tab => this.router.navigate(['/home/' + tab]),
    );
  }

}
