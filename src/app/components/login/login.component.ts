import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../_services/auth.service';
import {TokenService} from '../../_services/token.service';
import {LoginUser} from "../../types/login-user";
import {Role} from "../../types/role";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: LoginUser = {
    email: "",
    password: ""
  };

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  role: Role = Role.RIDER;

  constructor(private authService: AuthService, private tokenService: TokenService, private tokenStorage: TokenService, private router: Router) {
    this.redirectIfLoggedIn();
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.role = this.tokenStorage.getUser().role;
    }
  }

  redirectIfLoggedIn() {
    if (this.tokenService.isAuthenticated()) {
      this.router.navigate(['request'])
        .then(() => {
          window.location.reload();
        });
    }
  }

  onSubmit(): void {
    this.authService.login(this.form).subscribe({
      next: (data: any) => {
            this.tokenService.saveToken(data?.token);
            this.tokenService.saveUser(data);
            this.router.navigate(['request'])
        },
      error: (err: any) => {
        err.status === 401 ? this.errorMessage = 'Invalid credentials' : this.errorMessage = 'Something went wrong';
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }
}
