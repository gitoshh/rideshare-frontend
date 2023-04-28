import {Component} from '@angular/core';
import {Vehicle} from "../../types/vehicle";
import {UserService} from "../../_services/user.service";
import {TokenService} from "../../_services/token.service";
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent {

  minYear: number = 2005;

  private date: Date = new Date();

  currentYear: number = this.date.getFullYear();

  errorMessage: string = '';


  constructor(private userService: UserService, private tokenService: TokenService, private router: Router) {
  }

  form: Vehicle = {
    make: "",
    model: "",
    year: this.currentYear,
    color: "",
    licensePlate: "",
    insurancePolicyNumber: ""
  };

  onSubmit(): void {
    this.userService.registerVehicle(this.form).subscribe({
      next: data => {
        this.userService.completeOnboarding()
          .subscribe({
            next: data => {
              this.tokenService.saveUser(data);
              this.router.navigate(['incoming'])
            },
            error: () => {
              this.errorMessage = 'Something went wrong';
            }
          });
      }
    });
  }
}
