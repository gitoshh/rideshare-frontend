import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Place} from "../../types/place";
import {GoogleService} from "../../_services/google.service";
import {PickedLocation} from "../../types/picked-location";
import {LatLng} from "../../types/lat-lng";
import {RequestService} from "../../_services/request.service";
import {RequestPayload} from "../../types/request-payload";
import {Observable, Subscriber, Subscription} from "rxjs";

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit, OnChanges {

  private googleService: GoogleService;

  private requestService: RequestService;

  apiLoaded: Promise<boolean> = {} as Promise<boolean>;

  center: google.maps.LatLngLiteral = {lat: 0, lng: 0};
  zoom = 16;

  markerOptions: google.maps.MarkerOptions = {draggable: false};
  markerPositions: google.maps.LatLngLiteral[] = [];

  origin: PickedLocation = {address: "Current Location", lng: this.center.lng, lat: this.center.lat};
  destination: PickedLocation = {address: "", lng: 0, lat: 0};
  locationsSubscription: Subscription | undefined;

  locations: Observable<any> | undefined;

  watchId: number | undefined;

  places: Place[] = [];
  rides: any[] = [];

  constructor(googleService: GoogleService, requestService: RequestService) {
    this.googleService = googleService;
    this.requestService = requestService;
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    throw new Error('Method not implemented.');
  }

  async ngOnInit() {
    await this.loadMap();
    await this.getCurrentLocation();
  }

  ngOnDestroy(): void {
    this.locationsSubscription?.unsubscribe();
  }

  async loadMap() {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = this.googleService.getMapsUrl();
    this.apiLoaded = new Promise<boolean>((resolve, reject) => {
      script.async = true;
      script.defer = true;
      script.onload = () => resolve(true);
      script.onerror = () => reject(false);
      document.body.appendChild(script);
    });
  }

  addMarker(event: google.maps.MapMouseEvent) {
    console.log(event.latLng);
    if (event.latLng !== null && event.latLng !== undefined) {
      this.markerPositions = [{lat: event.latLng.lat(), lng: event.latLng.lng()}];

      const location = {lat: event.latLng.lat(), lng: event.latLng.lng()};
      this.setDestination(location);
    }
  }

  findARide() {
    const payload: RequestPayload = {
      startLatitude: this.origin.lat,
      startLongitude: this.origin.lng,
      endLatitude: this.destination.lat,
      endLongitude: this.destination.lng,
    }

    this.requestService.requestRide(payload).subscribe((rides: any) => {
      this.rides = [...rides];
    });
  }

  setDestination(location: LatLng) {
    this.googleService.getGeocoder().geocode({location: location}).subscribe((results: any) => {
      if (results[0]) {
        this.destination = {address: results[0].formatted_address, lng: location.lng, lat: location.lat};
      } else {
        this.destination = {address: location.lng + "," + location.lat, lat: location.lat, lng: location.lng};
      }
    });
  }

  setOrigin(location: LatLng) {
    this.googleService.getGeocoder().geocode({location: location}).subscribe((results: any) => {
      if (results[0]) {
        this.origin = {address: results[0].formatted_address, lng: location.lng, lat: location.lat};
      } else {
        this.origin = {address: location.lng + "," + location.lat, lat: location.lat, lng: location.lng};
      }
    });

  }

  getCurrentLocation() {
    // Create an Observable that will start listening to geolocation updates
    // when a consumer subscribes.
    // @ts-ignore
    this.locations = new Observable((observer) => {
      // Simple geolocation API check provides values to publish
      if ('geolocation' in navigator) {
        this.watchId = navigator.geolocation.watchPosition((position: GeolocationPosition) => {
          observer.next(position);
        }, (error: GeolocationPositionError) => {
          observer.error(error);
        });
      } else {
        observer.error('Geolocation not available');
      }

      // When the consumer unsubscribes, clean up data ready for next subscription.
      return {

      };
    });

    this.locationsSubscription = this.locations.subscribe((position: any) => {
      this.showPosition(position);
      this.setOrigin({lat: position.coords.latitude, lng: position.coords.longitude});
    });
  }

  unsubscribe() {
    if (typeof this.watchId === "number") {
      navigator.geolocation.clearWatch(this.watchId);
    }
  }

  showPosition(position: GeolocationPosition) {
    if (position !== null) {
      this.center = {lat: position.coords.latitude, lng: position.coords.longitude};
      this.markerPositions.push(this.center);
    }
  }
}
