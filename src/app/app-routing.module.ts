import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'visualize',
    pathMatch: 'full',
  },
  {
    path: 'visualize',
    loadChildren: () =>
      import('./visualize/visualize.module').then((m) => m.VisualizePageModule),
  },
  {
    path: 'about-dev',
    loadChildren: () =>
      import('./about-dev/about-dev.module').then((m) => m.AboutDevPageModule),
  },
  // {
  //   path: 'results-modal',
  //   loadChildren: () => import('./results-modal/results-modal.module').then( m => m.ResultsModalPageModule)
  // },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
