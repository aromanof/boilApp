import { Component, OnInit } from '@angular/core';
import { TaskTypeEnum } from '../../shared/enums/task-type.enum';
import { ActivatedRoute } from '@angular/router';
import { CoefInterfaceTask1, CoefInterfaceTask3 } from '../../shared/interfaces/coefInterfaceTask1';
import { NavigationCalculationsInterface } from '../../shared/interfaces/navigation-calculations.interface';

@Component({
  selector: 'app-calculations',
  templateUrl: './calculations.component.html',
  styleUrls: ['./calculations.component.sass']
})
export class CalculationsComponent implements OnInit {
  public calculationNavigation: NavigationCalculationsInterface;
  public constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      if (params && params["taskNum"] && params["coefs"] && params["results"]) {
        this.calculationNavigation = {
          taskNum: params["taskNum"],
          coefs: JSON.parse(params["coefs"]),
          results: JSON.parse(params["results"]),
        };
      }
    });
  }

    ngOnInit() {
  }

}
