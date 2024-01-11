import { Injectable } from '@angular/core';
import { injectStripe } from 'ngx-stripe';
import Stripe from 'stripe';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class StripeConnectorService {
  public stripe = new Stripe(environment.stripe.secret_key);
  public ngxStripe = injectStripe(environment.stripe.public_key);

  constructor() {}
}
