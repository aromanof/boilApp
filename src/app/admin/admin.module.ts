import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import {adminRoutes} from './admin.routing';
import {AdminGuard} from './admin-guard.service';
import {CustomComponentsModule} from '../shared/modules/custom-components/custom-components.module';

@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    adminRoutes,
    CustomComponentsModule,
  ],
  providers: [
    AdminGuard,
  ],
})
export class AdminModule { }
