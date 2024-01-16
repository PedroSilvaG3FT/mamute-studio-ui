import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppPageNavComponent } from '../../../@shared/components/app-page-nav/app-page-nav.component';

@Component({
  standalone: true,
  selector: 'app-marketplace',
  styleUrl: './marketplace.component.scss',
  imports: [AppPageNavComponent, RouterLink],
  templateUrl: './marketplace.component.html',
})
export class MarketplaceComponent {}
