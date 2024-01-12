import { JsonPipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute } from '@angular/router';
import { AuthStore } from '../../../../../store/auth.store';
import { generateUUID } from '../../../../@core/functions/uuid.function';
import { STRIPE_PRODUCTS } from '../../../../@core/stripe/@constants/stripe-product.constant';
import {
  IStripeCustomer,
  IStripeCutomerSubscriptions,
} from '../../../../@core/stripe/@interfaces/stripe.interface';
import { StripeService } from '../../../../@core/stripe/stripe.service';
import { TerminalWindowComponent } from '../../../components/terminal-window/terminal-window.component';

@Component({
  standalone: true,
  selector: 'app-stripe',
  styleUrl: './stripe.component.scss',
  templateUrl: './stripe.component.html',
  imports: [
    JsonPipe,
    MatButtonModule,
    MatTooltipModule,
    TerminalWindowComponent,
  ],
})
export class StripeComponent {
  public isSuccess: boolean = false;
  public isCanceled: boolean = false;
  public authStore = inject(AuthStore);

  public customer: IStripeCustomer = {} as IStripeCustomer;
  public customerSubscriptions: IStripeCutomerSubscriptions =
    {} as IStripeCutomerSubscriptions;

  public customerId = computed(() => this.authStore.stripeCustomerId());
  public hasCustomer = computed(() => !!this.authStore.stripeCustomerId());

  constructor(
    private stripeService: StripeService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    const params = this.activatedRoute.snapshot.queryParams;

    this.isSuccess = !!params['success'];
    this.isCanceled = !!params['canceled'];

    if (this.isSuccess || this.hasCustomer()) this.getCustomer();
  }

  public getCustomer() {
    this.stripeService._customer
      .getById(this.customerId())
      .then((response) => {
        this.customer = response;
        this.getCustomerSubscription();
      })
      .catch((error) => console.log(error))
      .finally(() => {});
  }

  public getCustomerSubscription() {
    this.stripeService._customer
      .getSubscriptions(this.customerId())
      .then((response) => (this.customerSubscriptions = response))
      .catch((error) => console.log(error))
      .finally(() => {});
  }

  public createCostumer() {
    this.stripeService._customer
      .create(
        { name: 'Pedro Silva', email: 'pedro.silva-dev@hotmail.com' },
        generateUUID()
      )
      .then((response) => {
        this.getCustomer();
        this.authStore.setStripeCustomerId(response.id);
      })
      .catch((error) => console.log(error))
      .finally(() => {});
  }

  public openCostumerPortal() {
    this.stripeService._customer
      .openPortal(this.customerId())
      .then((response) => {
        if (response.url) window.open(response.url);
      })
      .catch((error) => console.log(error))
      .finally(() => {});
  }

  public goToCheckout() {
    const customerId = this.authStore.stripeCustomerId();

    this.stripeService
      .createSession([STRIPE_PRODUCTS.MONTH], customerId)
      .then((response) => {
        if (response.url) window.open(response.url);
        console.log(response);
      })
      .catch((error) => console.log(error))
      .finally(() => {});
  }
}
