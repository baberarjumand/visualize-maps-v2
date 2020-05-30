import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResultsModalPageRoutingModule } from './results-modal-routing.module';

import { ResultsModalPage } from './results-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResultsModalPageRoutingModule,
  ],
  declarations: [ResultsModalPage],
})
export class ResultsModalPageModule {}
