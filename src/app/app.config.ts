import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { rentPostReducer } from './store/renthub.reducer';
import { RentPostEffects } from './store/renthub.effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { env } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideRouter(routes),
    provideStore({ posts: rentPostReducer, comments: rentPostReducer }),
    provideEffects([RentPostEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: env.production })
],
};
