import { Injectable, inject } from '@angular/core';
import { SEOService } from '../services/seo.service';
import { IStripeProductLineItem } from './@interfaces/stripe.interface';
import { StripeCustomerService } from './stripe-customer.service';
import { StripeConnectorService } from './stripe.connector';

@Injectable({ providedIn: 'root' })
export class StripeService {
  public _customer = inject(StripeCustomerService);
  private _connector = inject(StripeConnectorService);
  private originRoute = `${this.seoService.getCurrentDomain()}/features/stripe`;

  constructor(private seoService: SEOService) {}

  public createSession(products: IStripeProductLineItem[], customerId: string) {
    return this._connector.stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: products,
      customer: customerId,
      cancel_url: `${this.originRoute}?canceled=true`,
      success_url: `${this.originRoute}?success=true`,
    });
  }
}
