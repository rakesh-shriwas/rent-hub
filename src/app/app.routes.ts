import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./components/layout/layout.component').then(
        (c) => c.LayoutComponent
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./components/home/home.component').then(
            (c) => c.HomeComponent
          ),
      },
      {
        path: 'post/:id',
        loadComponent: () =>
          import('./components/post-details/post-details.component').then(
            (c) => c.PostDetailsComponent
          ),
      },
      {
        path: 'my/fav',
        loadComponent: () =>
          import('./components/fav-list/fav-list.component').then(
            (c) => c.FavListComponent
          ),
      },
      {
        path: 'fav/post/:id',
        loadComponent: () =>
          import('./components/post-details/post-details.component').then(
            (c) => c.PostDetailsComponent
          ),
      },
      {
        path: 'my/post',
        loadComponent: () =>
          import('./components/post-list/post-list.component').then(
            (c) => c.PostListComponent
          ),
      },
      {
        path: 'my/post/:id',
        loadComponent: () =>
          import('./components/post-details/post-details.component').then(
            (c) => c.PostDetailsComponent
          ),
      },
    ],
  },
];
