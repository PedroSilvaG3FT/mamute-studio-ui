import { Component, Input } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IPartnerItem } from '../../../@shared/interface/partner.interface';

@Component({
  standalone: true,
  imports: [MatTooltipModule],
  selector: 'portal-partner-list',
  styleUrl: './portal-partner-list.component.scss',
  templateUrl: './portal-partner-list.component.html',
})
export class PortalPartnerListComponent {
  @Input({ required: true }) data: IPartnerItem[] = [];
}
