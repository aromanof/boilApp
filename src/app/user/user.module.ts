import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserComponent} from './user.component';
import {MaterialModule} from '../shared/modules/material/material.module';

@NgModule({
    declarations: [UserComponent],
    imports: [
        CommonModule,
        MaterialModule,
    ]
})
export class UserModule {
}
