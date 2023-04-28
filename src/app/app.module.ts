import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/home/app.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import {HttpClientJsonpModule, HttpClientModule} from "@angular/common/http";
import {authInterceptorProviders} from "./middleware/http-interceptor.interceptor";
import { RequestComponent } from './components/request/request.component';
import {FormsModule} from "@angular/forms";
import {GoogleMapsModule} from "@angular/google-maps";
import { VehicleComponent } from './components/vehicle/vehicle.component';
import { IncomingRequestsComponent } from './components/incoming-requests/incoming-requests.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    RequestComponent,
    VehicleComponent,
    IncomingRequestsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    GoogleMapsModule,
    HttpClientJsonpModule
  ],
  providers: [
    authInterceptorProviders,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
