import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {TokenService} from "../_services/token.service";

@Injectable({
  providedIn: 'root'
})
export class RequestsGuard {

  constructor(public auth: TokenService, public router: Router) {
  }

  canActivate(): boolean {
    if (this.auth.isAuthenticated() && this.auth.getUser().role === 'DRIVER') {
      this.router.navigate(['incoming'])
        .then(() => {
          window.location.reload();
        });
      return false;
    }
    return true;
  }

}
