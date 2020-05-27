import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisualizePageRoutingModule } from './visualize-routing.module';

import { VisualizePage } from './visualize.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VisualizePageRoutingModule
  ],
  declarations: [VisualizePage]
})
export class VisualizePageModule {}
