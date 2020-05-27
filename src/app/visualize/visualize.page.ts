import { Component, OnInit } from '@angular/core';
import { LocationService } from '../services/location.service';

@Component({
  selector: 'app-visualize',
  templateUrl: './visualize.page.html',
  styleUrls: ['./visualize.page.scss'],
})
export class VisualizePage implements OnInit {
  // start coords set at Big Ben
  currentLat = 51.50072919999999;
  currentLng = -0.1246254;
  currentZoom = 14;

  constructor(private locationService: LocationService) { }

  ngOnInit() {
  }

  async locateUser() {
    const currentCoords = await this.locationService.getCurrentPosition();
    this.currentLat = currentCoords.lat;
    this.currentLng = currentCoords.lng;
  }

}
