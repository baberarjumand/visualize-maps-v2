import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisualizePage } from './visualize.page';

const routes: Routes = [
  {
    path: '',
    component: VisualizePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisualizePageRoutingModule {}
