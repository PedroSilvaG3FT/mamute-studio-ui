import { Component } from '@angular/core';
import { IPrayerWallItem } from '../../../../@shared/interface/prayer-wall.interface';
import { PortalCardPrayerComponent } from '../../../components/portal-card-prayer/portal-card-prayer.component';
import { PortalCardRedirectDetailComponent } from '../../../components/portal-card-redirect-detail/portal-card-redirect-detail.component';

@Component({
  standalone: true,
  selector: 'portal-home-prayer-wall',
  styleUrl: './home-prayer-wall.component.scss',
  templateUrl: './home-prayer-wall.component.html',
  imports: [PortalCardPrayerComponent, PortalCardRedirectDetailComponent],
})
export class HomePrayerWallComponent {
  public prayer: IPrayerWallItem = {
    id: '',
    active: true,
    category: '1',
    userCreator: '',
    userApprover: '',
    creationDate: new Date(),
    authorName: 'Pedro Silva',
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
  };

  public prayers = [this.prayer, this.prayer, this.prayer];
}
