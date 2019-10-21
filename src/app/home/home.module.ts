import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {MaterialModule} from '../shared/modules/material/material.module';
import {CustomComponentsModule} from '../shared/modules/custom-components/custom-components.module';
import { UserRoutingModule } from './user-routing.module';
import { CalculationTask1Component } from './calculations/calculation-task1/calculation-task1.component';
import { CalculationTask2Component } from './calculations/calculation-task2/calculation-task2.component';
import { CalculationTask3Component } from './calculations/calculation-task3/calculation-task3.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalculationResultsComponent } from './calculations/calculation-results/calculation-results.component';
import { CalculationChartComponent } from './calculations/calculation-chart/calculation-chart.component';
import { ChartsModule } from 'ng2-charts';
import { CalculationsComponent } from './calculations/calculations.component';
import { UnitConvertionComponent } from './unit-convertion/unit-convertion.component';
import { AdminComponent } from './admin/admin.component';

@NgModule({
  declarations: [
    HomeComponent,
    CalculationTask1Component,
    CalculationTask2Component,
    CalculationTask3Component,
    CalculationResultsComponent,
    CalculationChartComponent,
    CalculationsComponent,
    UnitConvertionComponent,
    AdminComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    CustomComponentsModule,
    UserRoutingModule,
    ReactiveFormsModule,
    ChartsModule,
    FormsModule,
  ]
})
export class HomeModule {
}
