import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {MaterialModule} from '../material/material.module';
import { HeaderMenuComponent } from './header/header-menu/header-menu.component';
import { MainLoaderComponent } from './main-loader/main-loader.component';
import { HistoryCardComponent } from './history-card/history-card.component';
import { Task1GroupComponent } from './task1-group/task1-group.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Task3GroupComponent } from './task3-group/task3-group.component';
import { CalculationResultsComponent } from './calculation-results/calculation-results.component';

const components = [
  HeaderComponent,
  HeaderMenuComponent,
  MainLoaderComponent,
  HistoryCardComponent,
  CalculationResultsComponent,
];

@NgModule({
  declarations: [
    ...components,
    Task1GroupComponent,
    Task3GroupComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  exports: [
    ...components,
  ]
})
export class CustomComponentsModule { }
