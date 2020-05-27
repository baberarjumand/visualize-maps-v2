import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';

const { Geolocation } = Plugins;

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor() {}

  async getCurrentPosition() {
    const coordinates = await Geolocation.getCurrentPosition();
    // console.log('Current', coordinates.coords);
    const alertMessage =
      'Current Coordinates:\nLat: ' +
      coordinates.coords.latitude +
      '\nLng: ' +
      coordinates.coords.longitude;
    // console.log(alertMessage);
    // alert(alertMessage);
    const currentCoords = {
      lat: coordinates.coords.latitude,
      lng: coordinates.coords.longitude
    };
    return currentCoords;
  }
}
