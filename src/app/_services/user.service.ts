import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Vehicle} from "../types/vehicle";
import {TokenService} from "./token.service";
import {Router} from "@angular/router";


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient, private tokenService: TokenService, private router: Router) {
    this.http = http;
  }

  fetchUserById(id: number) {
    return this.http.get(environment.auth_api_url + '/users/' + id, httpOptions);
  }

  registerVehicle(vehicle: Vehicle) {
    return this.http.post(environment.auth_api_url + '/vehicles', {
      ...vehicle,
      userId: this.tokenService.getUserId()
    }, httpOptions)
      .subscribe({
        next: data => {
          this.http.post(environment.auth_api_url + '/users/' + this.tokenService.getUserId() + '/complete/onboarding',{}, httpOptions)
            .subscribe({
              next: data => {
                this.tokenService.saveUser(data);
                this.router.navigate(['incoming'])
              }
            });
        }
      });
  }
}
