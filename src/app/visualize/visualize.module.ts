import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisualizePageRoutingModule } from './visualize-routing.module';

import { VisualizePage } from './visualize.page';

import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { environment } from '../../environments/environment';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VisualizePageRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: environment.gmapsApiKey,
      libraries: ['places'],
    }),
  ],
  declarations: [VisualizePage],
  providers: [GoogleMapsAPIWrapper]
})
export class VisualizePageModule {}
