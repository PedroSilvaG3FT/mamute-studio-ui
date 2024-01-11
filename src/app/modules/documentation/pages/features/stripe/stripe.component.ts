import { Component } from '@angular/core';
import { STRIPE_PRODUCTS } from '../../../../@core/stripe/@constants/stripe-product.constant';
import { StripeService } from '../../../../@core/stripe/stripe.service';

@Component({
  imports: [],
  standalone: true,
  selector: 'app-stripe',
  styleUrl: './stripe.component.scss',
  templateUrl: './stripe.component.html',
})
export class StripeComponent {
  constructor(private stripeService: StripeService) {}

  ngOnInit() {}

  public goToCheckout() {
    this.stripeService
      .createSession([STRIPE_PRODUCTS.MONTH])
      .then((response) => {
        if (response.url) window.open(response.url);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  }
}
