import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
  NgZone,
} from '@angular/core';
import { LocationService } from '../services/location.service';
import { debounceTime } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import { MapsAPILoader } from '@agm/core';
import { IonSearchbar } from '@ionic/angular';

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
  // starting coords set at Big Ben
  currentLat = 51.50072919999999;
  currentLng = -0.1246254;
  currentZoom = 14;

  private currentLatLngSubject = new Subject<LatLngObject>();
  private currentLatLngObs$ = this.currentLatLngSubject.asObservable();
  private currentLatLngSub: Subscription;

  @ViewChild('searchbar', { static: false }) searchbarRef: IonSearchbar;
  private autocomplete: any;

  constructor(
    private locationService: LocationService,
    private mapsApiLoader: MapsAPILoader,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    this.currentLatLngSub = this.currentLatLngObs$
      .pipe(debounceTime(100))
      .subscribe((latLng: LatLngObject) => {
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

  ionViewDidEnter() {
    this.searchbarRef.getInputElement().then((inputEl: HTMLInputElement) => {
      this.autocomplete = new google.maps.places.Autocomplete(inputEl);
      this.autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place: google.maps.places.PlaceResult = this.autocomplete.getPlace();

          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          this.setCurrentCenterCoords(
            place.geometry.location.lat(),
            place.geometry.location.lng()
          );
        });
      });
    });
  }

  setCurrentCenterCoords(lat, lng) {
    // this.currentLat = lat;
    // this.currentLng = lng;
    const newLatLngObject: LatLngObject = {
      lat,
      lng,
    };
    this.currentLatLngSubject.next(newLatLngObject);
  }

  async locateUser() {
    const currentCoords = await this.locationService.getCurrentPosition();
    this.setCurrentCenterCoords(currentCoords.lat, currentCoords.lng);
  }

  markerDragEnd($event: any) {
    // console.log(JSON.stringify($event));
    this.setCurrentCenterCoords($event.coords.lat, $event.coords.lng);
  }

  mapCenterChanged($event: any) {
    this.setCurrentCenterCoords($event.lat, $event.lng);
  }

  goToVisImagePage() {
    console.log(
      'Current Center Coords:\nCurrentLat: ' +
        this.currentLat +
        '\nCurrentLng: ' +
        this.currentLng
    );
  }
}
