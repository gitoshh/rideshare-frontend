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
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.authService.register(this.form).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: err => {
        if (err.status === 400) {
          this.errorMessage = "use valid details.";
        } else {
          this.errorMessage = "Something went wrong";
        }
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
