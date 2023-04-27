import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {SignupComponent} from "./components/signup/signup.component";
import {AppComponent} from "./components/home/app.component";
import {RequestComponent} from "./components/request/request.component";
import {AuthGuard} from "./guards/auth-guard.service";

const routes: Routes = [
  {path: 'home', component: AppComponent},
  {path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
  {path: 'request', component: RequestComponent, canActivate: [AuthGuard]},
  {path: 'signup', component: SignupComponent},
  {path: '**', redirectTo: '/request', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
