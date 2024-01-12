import Stripe from 'stripe';

export interface IStripeProductLineItem
  extends Stripe.Checkout.SessionCreateParams.LineItem {}

export interface IStripeCustomerCreateResponse
  extends Stripe.Response<Stripe.Customer> {}

export interface IStripeCustmerCreate extends Stripe.CustomerCreateParams {}

export interface IStripeCustomer extends Stripe.Response<Stripe.Customer> {}

export interface IStripeCustomerSubscriptionItem extends Stripe.Subscription {}
export interface IStripeCutomerSubscriptions
  extends Stripe.Response<Stripe.ApiList<IStripeCustomerSubscriptionItem>> {}
