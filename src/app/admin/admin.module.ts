import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import {adminRoutes} from './admin.routing';
import {AdminGuard} from './admin-guard.service';

@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    adminRoutes,
  ],
  providers: [
    AdminGuard,
  ],
})
export class AdminModule { }
