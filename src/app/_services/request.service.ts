import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '../../environments/environment';
import {RequestPayload} from "../types/request-payload";
import {TokenService} from "./token.service";

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  constructor(private http: HttpClient, private tokenService: TokenService) {
    this.http = http;
    this.tokenService = tokenService;
  }

  public requestRide(requestPayload: RequestPayload): Observable<any> {
    console.log(this.tokenService.getUserId());
    return this.http.post(environment.request_api_url + '/ride-requests', {
      ...requestPayload, userId: this.tokenService.getUserId()
    }, {responseType: 'json'});
  }

}
