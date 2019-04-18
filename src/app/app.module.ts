import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AlertService} from './shared/services/alert.service';
import {NotifierModule} from 'angular-notifier';
import {SimpleNotificationsModule} from "angular2-notifications";
import {MaterialModule} from "./shared/modules/material/material.module";
import {AuthGuard} from "./shared/services/auth-guard.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    NotifierModule,
    SimpleNotificationsModule.forRoot(),
  ],
  providers: [
      AlertService,
      AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
