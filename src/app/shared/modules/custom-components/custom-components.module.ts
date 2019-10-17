import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {MaterialModule} from '../material/material.module';
import { HeaderMenuComponent } from './header/header-menu/header-menu.component';
import { MainLoaderComponent } from './main-loader/main-loader.component';

const components = [
  HeaderComponent,
  HeaderMenuComponent,
  MainLoaderComponent,
];

@NgModule({
  declarations: [
    ...components,
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    ...components,
  ]
})
export class CustomComponentsModule { }
