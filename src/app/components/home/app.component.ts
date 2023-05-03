import {Component, OnInit} from '@angular/core';
import {TokenService} from "../../_services/token.service";
import {Role} from "../../types/role";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'rideshare-frontend';

  isLoggedIn: boolean = false;

  constructor(private tokenService: TokenService, private router: Router) {
  }

  ngOnInit(): void {
    this.isLoggedIn = this.tokenService.isAuthenticated();
  }

  logout() {
    this.tokenService.signOut()
    this.router.navigate(['/login']).then(() => window.location.reload());
    this.isLoggedIn = false;
  }
}
