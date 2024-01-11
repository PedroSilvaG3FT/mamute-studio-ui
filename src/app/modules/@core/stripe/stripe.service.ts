import { Injectable, inject } from '@angular/core';
import { SEOService } from '../services/seo.service';
import { IStripeProductLineItem } from './@interfaces/stripe.interface';
import { StripeConnectorService } from './stripe.connector';

@Injectable({ providedIn: 'root' })
export class StripeService {
  private _connector = inject(StripeConnectorService);

  constructor(private seoService: SEOService) {}

  public createSession(products: IStripeProductLineItem[]) {
    const domain = this.seoService.getCurrentDomain();
    return this._connector.stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: products,
      cancel_url: `${domain}/features/stripe?canceled=true`,
      success_url: `${domain}/features/stripe?success=true`,
    });
  }
}
