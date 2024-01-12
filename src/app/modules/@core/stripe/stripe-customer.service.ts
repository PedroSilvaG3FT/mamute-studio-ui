import { Injectable, inject } from '@angular/core';
import { SEOService } from '../services/seo.service';
import {
  IStripeCustmerCreate,
  IStripeCustomer,
} from './@interfaces/stripe.interface';
import { StripeConnectorService } from './stripe.connector';

@Injectable({ providedIn: 'root' })
export class StripeCustomerService {
  private _connector = inject(StripeConnectorService);
  private originRoute = `${this.seoService.getCurrentDomain()}/features/stripe`;

  constructor(private seoService: SEOService) {}

  public getById(id: string) {
    return this._connector.stripe.customers.retrieve(
      id
    ) as Promise<IStripeCustomer>;
  }

  public create(data: IStripeCustmerCreate, id: string) {
    return this._connector.stripe.customers.create({
      ...data,
      metadata: { id },
    });
  }

  public openPortal(customerId: string, backToRoute = this.originRoute) {
    return this._connector.stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: backToRoute,
    });
  }

  public getSubscriptions(customer: string) {
    return this._connector.stripe.subscriptions.list({ customer });
  }
}
