import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { LocationService } from '../services/location.service';
import { debounceTime } from 'rxjs/operators';
import { Observable, fromEvent, Subject, Subscription } from 'rxjs';

interface LatLngObject {
  lat: number;
  lng: number;
}

@Component({
  selector: 'app-visualize',
  templateUrl: './visualize.page.html',
  styleUrls: ['./visualize.page.scss'],
})
export class VisualizePage implements OnInit, OnDestroy {
  // start coords set at Big Ben
  currentLat = 51.50072919999999;
  currentLng = -0.1246254;
  currentZoom = 14;
  private currentLatLngSubject = new Subject<LatLngObject>();
  private currentLatLngObs$ = this.currentLatLngSubject.asObservable();
  private currentLatLngSub: Subscription;

  constructor(private locationService: LocationService) {}

  ngOnInit() {
    this.currentLatLngSub = this.currentLatLngObs$
      .pipe(debounceTime(500))
      .subscribe((latLng) => {
        // console.log(latLng);
        this.currentLat = latLng.lat;
        this.currentLng = latLng.lng;
      });
  }

  ngOnDestroy() {
    if (this.currentLatLngSub) {
      this.currentLatLngSub.unsubscribe();
    }
  }

  async locateUser() {
    const currentCoords = await this.locationService.getCurrentPosition();
    this.setCurrentCoords(currentCoords.lat, currentCoords.lng);
  }

  setCurrentCoords(lat, lng) {
    // this.currentLat = lat;
    // this.currentLng = lng;
    const newLatLngObject: LatLngObject = {
      lat,
      lng,
    };
    this.currentLatLngSubject.next(newLatLngObject);
  }

  markerDragEnd($event: any) {
    // console.log(JSON.stringify($event));
    this.setCurrentCoords($event.coords.lat, $event.coords.lng);
  }

  mapCenterChanged($event: any) {
    const newLatLngObject: LatLngObject = {
      lat: $event.lat,
      lng: $event.lng,
    };
    this.currentLatLngSubject.next(newLatLngObject);
  }

  goToVisImagePage() {}
}
