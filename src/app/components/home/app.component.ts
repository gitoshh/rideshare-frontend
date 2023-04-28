import {Component} from '@angular/core';
import {TokenService} from "../../_services/token.service";
import {Role} from "../../types/role";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rideshare-frontend';

  isRider: boolean = false;

  isLoggedIn: boolean = false;

  constructor(tokenService: TokenService, private router: Router) {
  }
}
