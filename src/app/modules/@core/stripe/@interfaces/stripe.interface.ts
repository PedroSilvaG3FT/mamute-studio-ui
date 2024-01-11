import Stripe from 'stripe';

export interface IStripeProductLineItem
  extends Stripe.Checkout.SessionCreateParams.LineItem {}
