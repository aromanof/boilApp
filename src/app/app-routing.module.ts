import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { MaterialsComponent } from './home/materials/materials.component';
import { AuthGuard } from './shared/services/auth-guard.service';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full',
    },
    {
        path: 'auth',
        loadChildren: './auth/auth.module#AuthModule',
    },
    {
        path: 'home',
        loadChildren: './home/home.module#HomeModule',
        canActivate: [AuthGuard],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
