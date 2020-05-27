import { Component, OnInit } from '@angular/core';
import { LocationService } from '../services/location.service';

@Component({
  selector: 'app-visualize',
  templateUrl: './visualize.page.html',
  styleUrls: ['./visualize.page.scss'],
})
export class VisualizePage implements OnInit {

  constructor(private locationService: LocationService) { }

  ngOnInit() {
  }

  async locateUser() {
    await this.locationService.getCurrentPosition();
  }

}
