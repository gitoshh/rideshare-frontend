import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {MapGeocoder} from "@angular/google-maps";

@Injectable({
  providedIn: 'root'
})
export class GoogleService {

  private mapsUrl = `https://maps.googleapis.com/maps/api/js?key=${environment.google_maps_api_key}&libraries=places,geocoder`;

  private httpClient: HttpClient;
  private readonly geocoder: MapGeocoder;

  constructor(httpClient: HttpClient, geocoder: MapGeocoder) {
    this.httpClient = httpClient;
    this.geocoder = geocoder;
  }

  getMapsUrl(): string {
    return this.mapsUrl;
  }

  getGeocoder(): MapGeocoder {
    return this.geocoder;
  }


  async loadGoogleMaps() {
    return this.httpClient.jsonp(this.mapsUrl, 'callback');
  }
}
