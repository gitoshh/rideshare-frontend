import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../_services/auth.service';
import {User} from "../../types/user";
import {Router} from "@angular/router";
import {Role} from "../../types/role";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form: User = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
    role: Role.RIDER
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.authService.register(this.form).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.router.navigate(['/login'])
          .then(() => {
            window.location.reload();
          });
      },
      error: err => {
        if (err.status === 400) {
          this.errorMessage = "Username or email already in use.";
        } else {
          this.errorMessage = err.error.message;
        }
        this.isSignUpFailed = true;
      }
    });
  }

  toggleIsDriver() {
    this.form.role = this.form.role === Role.RIDER ? Role.DRIVER : Role.RIDER;
  }

  isRider() {
    return this.form.role === Role.RIDER;
  }
}
