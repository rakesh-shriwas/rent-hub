import { Routes } from "@angular/router";

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./card.component').then((r) => r.CardComponent),
        children: [
            {
                path: ':id',
                loadComponent: () => import('./card-details/card-details.component').then((c) => c.CardDetailsComponent)
            }
        ]
    }
]