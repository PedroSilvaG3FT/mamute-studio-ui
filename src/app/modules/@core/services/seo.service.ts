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

  public initTitleMonitoring() {
    this.$routerTitle = this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          const child: ActivatedRoute | null = this.route.firstChild;
          const title = child && child.snapshot.data['title'];

          if (title) return title;
        })
      )
      .subscribe((title) => {
        if (title) this.title.setTitle(`Boilerplate - ${title}`);
      });
  }

  public destoryTitleMonitoring() {
    this.$routerTitle.unsubscribe();
  }
}
