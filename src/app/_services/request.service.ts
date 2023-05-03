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
    return this.http.post(environment.request_api_url + '/ride-requests', {
      ...requestPayload, userId: this.tokenService.getUserId()
    }, {responseType: 'json'});
  }

  public fetchRideRequests(): Observable<any> {
    return this.http.get(environment.request_api_url + '/ride-matches/driver/' + this.tokenService.getUserId(), {responseType: 'json'});
  }

  acceptRideRequest(requestId: number) {
    return this.http.post(environment.request_api_url + '/ride-matches/' + requestId + '/accept', {}, {responseType: 'json'});
  }

  rejectRequest(requestId: number) {
    return this.http.post(environment.request_api_url + '/ride-matches/' + requestId + '/reject', {}, {responseType: 'json'});
  }

  updateDriverLocation(latitude: number, longitude: number) {
    return this.http.post(environment.locating_api_url + '/locations', {
      latitude: latitude,
      longitude: longitude,
      userId: this.tokenService.getUserId(),
      isDriver: this.tokenService.getUser().role === 'DRIVER',
      isActive: true
    }, {responseType: 'json'});
  }
}
