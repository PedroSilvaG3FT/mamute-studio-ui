import { Component } from '@angular/core';
import { PortalHighlightCardComponent } from '../../../components/portal-highlight-card/portal-highlight-card.component';

@Component({
  standalone: true,
  selector: 'portal-home-event',
  imports: [PortalHighlightCardComponent],
  styleUrl: './home-event.component.scss',
  templateUrl: './home-event.component.html',
})
export class HomeEventComponent {}
