import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResultsModalPage } from './results-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ResultsModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResultsModalPageRoutingModule {}
