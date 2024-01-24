import { Component, Input } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { IPartnerItem } from '../../../@shared/interface/partner.interface';

@Component({
  standalone: true,
  selector: 'portal-partner-list',
  imports: [MatTooltipModule, RouterModule],
  styleUrl: './portal-partner-list.component.scss',
  templateUrl: './portal-partner-list.component.html',
})
export class PortalPartnerListComponent {
  @Input({ required: true }) data: IPartnerItem[] = [];
}
