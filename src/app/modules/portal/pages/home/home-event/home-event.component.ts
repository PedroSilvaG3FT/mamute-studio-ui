import { Component } from '@angular/core';
import { PortalCardRedirectDetailComponent } from '../../../components/portal-card-redirect-detail/portal-card-redirect-detail.component';
import { PortalCardComponent } from '../../../components/portal-card/portal-card.component';
import { PortalHighlightCardComponent } from '../../../components/portal-highlight-card/portal-highlight-card.component';

@Component({
  standalone: true,
  selector: 'portal-home-event',
  styleUrl: './home-event.component.scss',
  templateUrl: './home-event.component.html',
  imports: [
    PortalCardComponent,
    PortalHighlightCardComponent,
    PortalCardRedirectDetailComponent,
  ],
})
export class HomeEventComponent {}
