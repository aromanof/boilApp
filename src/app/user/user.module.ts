import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserComponent} from './user.component';
import {MaterialModule} from '../shared/modules/material/material.module';
import {CustomComponentsModule} from '../shared/modules/custom-components/custom-components.module';

@NgModule({
    declarations: [UserComponent],
    imports: [
        CommonModule,
        MaterialModule,
        CustomComponentsModule,
    ]
})
export class UserModule {
}
