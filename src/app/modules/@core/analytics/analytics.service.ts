import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

declare var gtag: any;

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private $routerSubscription!: Subscription;

  constructor(private _router: Router) {
    this.$routerSubscription = this._router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        gtag('js', new Date());
        gtag('config', environment.firebase.measurementId);
      });
  }

  ngOnDestroy() {
    this.$routerSubscription.unsubscribe();
  }

  public init() {
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${environment.firebase.measurementId}`;
    script.async = true;

    document.head.appendChild(script);

    const gtagEl = document.createElement('script');
    const gtagBody = document.createTextNode(`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
    `);

    gtagEl.appendChild(gtagBody);
    document.body.appendChild(gtagEl);
  }

  public emit(event: string, payload: object) {
    gtag('event', event, payload);
  }
}
