import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { CalculationsComponent } from './calculations/calculations.component';
import { UnitConvertionComponent } from './unit-convertion/unit-convertion.component';
import { AuthGuard } from '../shared/services/auth-guard.service';
import { AdminGuard } from './admin/admin-guard.service';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  { path: '', component: HomeComponent, children:
    [
      {
        path: 'calculations',
        component: CalculationsComponent,
      },
      {
        path: 'unit-convertion',
        component: UnitConvertionComponent,
      },
      {
        path: 'admin',
        component: AdminComponent,
        canActivate: [ AuthGuard, AdminGuard ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
