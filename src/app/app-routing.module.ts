import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {SignupComponent} from "./components/signup/signup.component";
import {AppComponent} from "./components/home/app.component";
import {RequestComponent} from "./components/request/request.component";
import {AuthGuard} from "./guards/auth-guard.service";
import {VehicleComponent} from "./components/vehicle/vehicle.component";
import {IncomingRequestsComponent} from "./components/incoming-requests/incoming-requests.component";
import {RequestsGuard} from "./guards/requests-guard.service";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'request', component: RequestComponent, canActivate: [RequestsGuard, AuthGuard]},
  {path: 'signup', component: SignupComponent},
  {path: 'onboarding', component: VehicleComponent, canActivate: [AuthGuard]},
  {path: 'incoming', component: IncomingRequestsComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
