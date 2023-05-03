import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { User } from '../../types/user';
import { Router } from '@angular/router';
import { Role } from '../../types/role';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  isRider: boolean = true;
  form: User = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    isRider: this.isRider,
    isDriver: !this.isRider,
  };
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.authService.register(this.form).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        if (err.status === 400) {
          this.errorMessage = 'use valid details.';
        } else {
          this.errorMessage = 'Something went wrong';
        }
      },
    });
  }

  toggleIsRider() {
    this.isRider = !this.isRider;
  }
}
