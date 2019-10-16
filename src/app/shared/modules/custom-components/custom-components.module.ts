import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {MaterialModule} from '../material/material.module';
import { HeaderMenuComponent } from './header/header-menu/header-menu.component';

@NgModule({
  declarations: [
      HeaderComponent,
      HeaderMenuComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
      HeaderComponent,
  ]
})
export class CustomComponentsModule { }
