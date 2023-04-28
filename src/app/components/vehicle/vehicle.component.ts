import {Component} from '@angular/core';
import {Vehicle} from "../../types/vehicle";
import {UserService} from "../../_services/user.service";
import {TokenService} from "../../_services/token.service";

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent {

  minYear: number = 2005;

  private date: Date = new Date();

  currentYear: number = this.date.getFullYear();


  constructor(private userService: UserService, private tokenService: TokenService) {
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
    this.userService.registerVehicle(this.form);
  }
}
