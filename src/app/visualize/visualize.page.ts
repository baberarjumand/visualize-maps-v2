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
import { MapsAPILoader, AgmMap } from '@agm/core';
import {
  IonSearchbar,
  ModalController,
  LoadingController,
} from '@ionic/angular';
import { ResultsModalPage } from '../results-modal/results-modal.page';

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
  // @ViewChild('agmMapElement', { static: false }) mapElRef: AgmMap;

  private nearbyPlacesSearchRadius = 100; // this value is defined in meters
  private maxResultImageHeight = 300; // this value is defined in pixels

  constructor(
    private locationService: LocationService,
    private mapsApiLoader: MapsAPILoader,
    private ngZone: NgZone,
    private modalController: ModalController,
    private loadingController: LoadingController
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
    this.mapsApiLoader.load().then(() => {
      this.searchbarRef.getInputElement().then((inputEl: HTMLInputElement) => {
        this.autocomplete = new google.maps.places.Autocomplete(inputEl);
        this.autocomplete.addListener('place_changed', () => {
          this.ngZone.run(() => {
            const place: google.maps.places.PlaceResult = this.autocomplete.getPlace();

            if (place.geometry === undefined || place.geometry === null) {
              return;
            }

            // console.log(place);
            this.setCurrentCenterCoords(
              place.geometry.location.lat(),
              place.geometry.location.lng()
            );
          });
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

  async goToVisImagePage() {
    const loading = await this.loadingController.create({
      message: 'Fetching images...',
    });
    await loading.present();
    this.mapsApiLoader
      .load()
      .then(() => {
        // console.log(
        //   'Current Center Coords:\nCurrentLat: ' +
        //     this.currentLat +
        //     '\nCurrentLng: ' +
        //     this.currentLng
        // );

        const resultPlaceIds = [];
        const resultImageUrls: string[] = [];

        const placesSearchRequest = {
          location: new google.maps.LatLng(this.currentLat, this.currentLng),
          radius: this.nearbyPlacesSearchRadius,
        };
        const placesService = new google.maps.places.PlacesService(
          document.getElementById('hiddenDiv') as HTMLDivElement
        );

        // fetch list of nearby places according to current map center
        placesService.nearbySearch(
          placesSearchRequest,
          (results, nearbySearchStatus) => {
            if (
              nearbySearchStatus === google.maps.places.PlacesServiceStatus.OK
            ) {
              results.forEach((result) => resultPlaceIds.push(result.place_id));

              // fetch imageUrls for each nearby placeId
              resultPlaceIds.forEach((placeId) => {
                const placeDetailsRequest = { placeId };
                placesService.getDetails(
                  placeDetailsRequest,
                  (placeResult, getPlaceDetailStatus) => {
                    if (
                      getPlaceDetailStatus ===
                      google.maps.places.PlacesServiceStatus.OK
                    ) {
                      if (placeResult.photos) {
                        const resultPhotos = placeResult.photos;
                        resultPhotos.forEach((photo) => {
                          const tempImageUrl: string = photo.getUrl({
                            maxHeight: this.maxResultImageHeight,
                          });
                          resultImageUrls.push(tempImageUrl);
                        });
                      }
                    } else {
                      // alert(
                      //   'Could not fetch place details for placeId: ' + placeId
                      // );
                      console.log(
                        'Could not fetch place details for placeId: ' +
                          placeId +
                          '\ngetPlaceDetailsStatus: ' +
                          getPlaceDetailStatus
                      );
                    }
                  }
                );
              });
              // console.log(Object.keys(resultImageUrls));
              setTimeout(async () => {
                // console.log(resultImageUrls);

                if (resultImageUrls.length > 0) {
                  const modal = await this.modalController.create({
                    component: ResultsModalPage,
                    componentProps: { imagesResultSet: resultImageUrls },
                  });
                  loading.dismiss();
                  return await modal.present();
                } else {
                  alert(
                    'No images found at this location. Please try another location.'
                  );
                  console.log(
                    'No images found at this location. Please try another location.'
                  );
                  loading.dismiss();
                }
              }, 500);
            } else {
              alert('Nearby Places Search failed');
              console.log('Nearby Search Status: ' + nearbySearchStatus);
              loading.dismiss();
            }
          }
        );
      })
      .catch((err) => {
        alert('Failed to load map');
        console.log(err);
        loading.dismiss();
      });
  }
}
