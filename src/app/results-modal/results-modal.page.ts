import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-results-modal',
  templateUrl: './results-modal.page.html',
  styleUrls: ['./results-modal.page.scss'],
})
export class ResultsModalPage implements OnInit {
  private maxResultImageHeight = 300; // this value is defined in pixels

  // @Input() imagesResultSet: string[];
  @Input() nearbyPlaceIds: string[];
  private placesService;
  private currentPlaceIndex;
  private maxPlaceIndex;
  imagesResultSet: string[] = [];
  imageLoading = true;

  constructor(
    private modalController: ModalController,
    private mapsApiLoader: MapsAPILoader
  ) {}

  ngOnInit() {
    // this.mapsApiLoader
    //   .load()
    //   .then(() => {
    //     this.placesService = new google.maps.places.PlacesService(
    //       document.getElementById('hiddenDiv') as HTMLDivElement
    //     );
    //   })
    //   .catch((err) => {
    //     console.log('Could not load maps\n' + err);
    //   });
    this.placesService = new google.maps.places.PlacesService(
      document.getElementById('hiddenDiv') as HTMLDivElement
    );
  }

  ionViewDidEnter() {
    // console.log(this.imagesResultSet);
    // console.log(this.nearbyPlaceIds);
    // on first load, only images for first placeId are fetched
    // this.fetchImagesForPlaceId(this.nearbyPlaceIds[this.currentPlaceIndex]);
    // this.currentPlaceIndex = 1;
    // this.currentPlaceIndex++;
    this.currentPlaceIndex = 0;
    this.maxPlaceIndex = this.nearbyPlaceIds.length - 1;
    console.log('PlaceId Array Length: ' + this.maxPlaceIndex);
    this.fetchImagesForPlaceId(this.nearbyPlaceIds[this.currentPlaceIndex]);
    this.currentPlaceIndex++;
  }

  dismissModal() {
    this.modalController.dismiss({ dismissed: true });
  }

  loadMoreImages($event) {
    // if (this.currentPlaceIndex <= this.maxPlaceIndex) {
    //   console.log('Loading PlaceId Index: ' + this.currentPlaceIndex);
    //   this.fetchImagesForPlaceId(this.nearbyPlaceIds[this.currentPlaceIndex]);
    //   console.log('Loaded PlaceId Index: ' + this.currentPlaceIndex);
    //   this.currentPlaceIndex++;
    //   // event.target.complete();
    // } else {
    //   event.target.complete();
    //   console.log(
    //     'Printed all images in current PlaceId array\nLast Loaded PlaceId Index: ' +
    //       this.currentPlaceIndex
    //   );
    //   event.target.disabled = true;
    // }
    setTimeout(() => {
      if (this.currentPlaceIndex <= this.maxPlaceIndex) {
        console.log('Loading PlaceId Index: ' + this.currentPlaceIndex);
        this.fetchImagesForPlaceId(this.nearbyPlaceIds[this.currentPlaceIndex]);
        console.log('Loaded PlaceId Index: ' + this.currentPlaceIndex);
        this.currentPlaceIndex++;
        $event.target.complete();

        if (this.currentPlaceIndex > this.maxPlaceIndex) {
          console.log(
            'Loaded last PlaceId index: ' + (this.currentPlaceIndex - 1)
          );
          $event.target.complete();
          $event.target.disabled = true;
        }
      }
    }, 500);
  }

  fetchImagesForPlaceId(placeId: string) {
    if (placeId && placeId.length > 0) {
      const placeDetailsRequest = { placeId };
      this.placesService.getDetails(
        placeDetailsRequest,
        (placeResult, getDetailsRequestStatus) => {
          if (
            getDetailsRequestStatus ===
            google.maps.places.PlacesServiceStatus.OK
          ) {
            if (placeResult.photos) {
              const resultPhotos = placeResult.photos;
              resultPhotos.forEach((photo) => {
                const tempImageUrl = photo.getUrl({
                  maxHeight: this.maxResultImageHeight,
                });
                this.imagesResultSet.push(tempImageUrl);
              });
            } else {
              console.log(
                'No photos in PlaceId index: ' +
                  this.currentPlaceIndex +
                  ' ' +
                  placeId
              );
              this.currentPlaceIndex++;
              this.fetchImagesForPlaceId(
                this.nearbyPlaceIds[this.currentPlaceIndex]
              );
            }
          } else {
            console.log(
              'Could not fetch place details for placeId: ' +
                placeId +
                '\ngetDetailsRequestStatus: ' +
                getDetailsRequestStatus
            );
          }
        }
      );
    }
  }
}
