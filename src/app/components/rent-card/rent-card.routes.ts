import { Routes } from "@angular/router";

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./rent-card.component').then((r) => r.RentCardComponent),
        children: [
            {
                path: ':id',
                loadComponent: () => import('./rent-card-details/rent-card-details.component').then((c) => c.RentCardDetailsComponent)
            }
        ]
    }
]