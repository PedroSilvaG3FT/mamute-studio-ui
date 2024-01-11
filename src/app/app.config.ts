import { ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  InMemoryScrollingFeature,
  provideRouter,
  withInMemoryScrolling,
} from '@angular/router';

import { provideAnimations } from '@angular/platform-browser/animations';
import { provideNgxStripe } from 'ngx-stripe';
import { environment } from '../environments/environment';
import { routes } from './app.routes';
import { FirebaseConnectorService } from './modules/@core/firebase/firebase-connector.service';
import { StripeConnectorService } from './modules/@core/stripe/stripe.connector';
import { SupabaseConnectorService } from './modules/@core/supabase/supabase-connector.service';

const inMemoryScrollingFeature: InMemoryScrollingFeature =
  withInMemoryScrolling({
    scrollPositionRestoration: 'top',
    anchorScrolling: 'enabled',
  });

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideAnimationsAsync(),
    StripeConnectorService,
    SupabaseConnectorService,
    FirebaseConnectorService,
    provideRouter(routes, inMemoryScrollingFeature),
    provideNgxStripe(environment.stripe.public_key),
  ],
};
