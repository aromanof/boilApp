// angular
import { RouterModule } from '@angular/router';

// app components
import { AdminComponent } from './admin.component';
import {AdminGuard} from './admin-guard.service';
import {AuthGuard} from '../shared/services/auth-guard.service';

export const adminRoutes = RouterModule.forChild([
    {
        path       : '',
        component  : AdminComponent,
        canActivate: [ AuthGuard, AdminGuard ],
    },
]);
