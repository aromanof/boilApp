import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {MaterialModule} from '../shared/modules/material/material.module';
import {CustomComponentsModule} from '../shared/modules/custom-components/custom-components.module';
import { UserRoutingModule } from './user-routing.module';
import { CalculationTask1Component } from './calculation-task1/calculation-task1.component';
import { CalculationTask2Component } from './calculation-task2/calculation-task2.component';
import { CalculationTask3Component } from './calculation-task3/calculation-task3.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CalculationResultsComponent } from './calculation-results/calculation-results.component';
import { CalculationChartComponent } from './calculation-chart/calculation-chart.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
    declarations: [HomeComponent, CalculationTask1Component, CalculationTask2Component, CalculationTask3Component, CalculationResultsComponent, CalculationChartComponent],
  imports: [
    CommonModule,
    MaterialModule,
    CustomComponentsModule,
    UserRoutingModule,
    ReactiveFormsModule,
    ChartsModule,
  ]
})
export class HomeModule {
}
