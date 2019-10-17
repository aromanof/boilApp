import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {MaterialModule} from '../shared/modules/material/material.module';
import {CustomComponentsModule} from '../shared/modules/custom-components/custom-components.module';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
    declarations: [HomeComponent],
    imports: [
        CommonModule,
        MaterialModule,
        CustomComponentsModule,
        UserRoutingModule,
    ]
})
export class HomeModule {
}
