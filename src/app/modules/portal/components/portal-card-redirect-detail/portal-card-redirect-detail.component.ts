import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'portal-card-redirect-detail',
  styleUrl: './portal-card-redirect-detail.component.scss',
  templateUrl: './portal-card-redirect-detail.component.html',
})
export class PortalCardRedirectDetailComponent {
  @Input() text: string = 'ver mais';
  @Input({ required: true }) route: string = '';
}
