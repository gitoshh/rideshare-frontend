import {Component, OnInit} from '@angular/core';
import {RequestService} from "../../_services/request.service";
import {interval} from "rxjs";

@Component({
  selector: 'app-incoming-requests',
  templateUrl: './incoming-requests.component.html',
  styleUrls: ['./incoming-requests.component.css']
})
export class IncomingRequestsComponent implements OnInit {

  constructor(private requestService: RequestService) { }

  incomingRequests: any[] = []

  ngOnInit(): void {
    this.fetchMatchingRequests();
    this.updateDriverLocation();
  }

  updateDriverLocation() {
    interval(2000).subscribe(() => {
      navigator.geolocation.getCurrentPosition((position) => {
        this.requestService.updateDriverLocation(position.coords.latitude, position.coords.longitude).subscribe((response: any) => {
          console.log(response);
        });
      });
    });
  }

  fetchMatchingRequests() {
    interval(2000).subscribe(() => {
      this.requestService.fetchRideRequests().subscribe((response: any) => {
        this.incomingRequests = response.sort((a: any, b: any) => b.id - a.id);
      });
    });
  }

  acceptRequest(requestId: number) {
    this.requestService.acceptRideRequest(requestId).subscribe((response: any) => {
      this.acceptRequest(requestId);
    });
  }

  rejectRequest(requestId: number) {
    this.requestService.rejectRequest(requestId).subscribe((response: any) => {
      this.fetchMatchingRequests();
    });
  }
}
