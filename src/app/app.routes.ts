import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'solution/:solution_id',
    loadComponent: () => import('./pages/solution/solution.page').then( m => m.SolutionPage)
  },
  {
    path: 'product/:product_id',
    loadComponent: () => import('./pages/product/product.page').then( m => m.ProductPage)
  },
  {
    path: 'manufacturer/:manufacturer_id',
    loadComponent: () => import('./pages/manufacturer/manufacturer.page').then( m => m.ManufacturerPage)
  },
  {
    path: 'create-account',
    loadComponent: () => import('./auth/create-account/create-account.page').then( m => m.CreateAccountPage)
  },
];
