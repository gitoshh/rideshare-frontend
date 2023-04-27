import { Injectable } from '@angular/core';
import {TokenService} from "../_services/token.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(public auth: TokenService, public router: Router) {}
  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['login'])
        .then(() => {
          window.location.reload();
        });
      return false;
    }
    return true;
  }

}
