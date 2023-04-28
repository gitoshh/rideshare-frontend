import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {User} from "../types/user";

import { environment } from '../../environments/environment';
import {LoginUser} from "../types/login-user";
import {Router} from "@angular/router";
import {TokenService} from "./token.service";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router, private tokenService: TokenService) { }

  login(loginDetails: LoginUser): Observable<any> {
    return this.http.post(environment.auth_api_url + '/auth/login', {
      ...loginDetails
    }, httpOptions);
  }

  register(userDetails: User): Observable<any> {
    return this.http.post(environment.auth_api_url + '/auth/signup', {
    ...userDetails
    }, httpOptions);
  }
}
