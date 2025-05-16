import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';

export const routes1: Routes = [
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


// export const routes: Routes = [
//   {
//     path: '',
//     loadComponent: () =>
//       import('./pages/landing/landing.component').then(m => m.LandingComponent),
//   },
//   {
//     path: 'login',
//     loadComponent: () =>
//       import('./pages/login/login.component').then(m => m.LoginComponent),
//   },
//   {
//     path: 'app',
//     loadComponent: () =>
//       import('./pages/app/app-shell/app-shell.component').then(m => m.AppShellComponent),
//     // canActivate: [AuthGuard], // optional: protect this route
//     children: [
//       {
//         path: '',
//         redirectTo: 'main',
//         pathMatch: 'full',
//       },
//       {
//         path: 'main',
//         loadComponent: () =>
//           import('./pages/app/main/main.component').then(m => m.MainComponent),
//       },
//       {
//         path: 'fav',
//         loadComponent: () =>
//           import('./pages/app/fav/fav.component').then(m => m.FavComponent),
//       },
//       {
//         path: 'myposts',
//         loadComponent: () =>
//           import('./pages/app/myposts/myposts.component').then(m => m.MypostsComponent),
//       },
//       {
//         path: 'myposts/:id',
//         loadComponent: () =>
//           import('./pages/app/mypost-details/mypost-details.component').then(m => m.MypostDetailsComponent),
//       },
//       {
//         path: 'edit/:id',
//         loadComponent: () =>
//           import('./pages/app/edit/edit.component').then(m => m.EditComponent),
//       },
//     ],
//   },
//   {
//     path: '**',
//     redirectTo: '',
//   },
// ];