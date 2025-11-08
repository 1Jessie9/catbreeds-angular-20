import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'breeds',
    loadComponent: () => import('./pages/breed-list/breed-list.component').then(m => m.BreedListPage),
  },
  {
    path: 'breed/:breedId',
    loadComponent: () => import('./pages/breed-detail/breed-detail.component').then(m => m.BreedDetailPage),
  },
  { path: '**', redirectTo: 'breeds' }
];
