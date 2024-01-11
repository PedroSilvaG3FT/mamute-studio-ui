import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription, filter, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SEOService {
  private $routerTitle!: Subscription;

  constructor(
    private title: Title,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  public onRouteChange(callback?: Function) {
    return this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => {
        if (!!callback) callback();

        const child: ActivatedRoute | null = this.route.firstChild;
        return child?.snapshot.data || {};
      })
    );
  }

  public initTitleMonitoring() {
    this.$routerTitle = this.onRouteChange().subscribe((data) => {
      if (data['title']) this.title.setTitle(`Boilerplate - ${data['title']}`);
    });
  }

  public getRouteData(route = this.route): any {
    if (!!route.children.length) return this.getRouteData(route.children[0]);
    else return route.snapshot.data;
  }

  public destoryTitleMonitoring() {
    this.$routerTitle.unsubscribe();
  }

  public getCurrentDomain(showHttpLocalhost = true) {
    const domain = window.location.host;

    const hasHttp = domain.includes('http');
    const isLocalhost = domain.includes('localhost');
    const replacedDomain =
      showHttpLocalhost && isLocalhost && !hasHttp
        ? `http://${domain}`
        : domain;

    return replacedDomain;
  }
}
