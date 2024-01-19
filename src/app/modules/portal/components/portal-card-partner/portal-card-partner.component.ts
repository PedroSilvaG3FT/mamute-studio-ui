import { Component, Input, inject } from '@angular/core';
import { SeedStore } from '../../../../store/seed.store';
import { IPartnerItem } from '../../../@shared/interface/partner.interface';

@Component({
  imports: [],
  standalone: true,
  selector: 'portal-card-partner',
  styleUrl: './portal-card-partner.component.scss',
  templateUrl: './portal-card-partner.component.html',
})
export class PortalCardPartnerComponent {
  @Input() data: IPartnerItem = {} as IPartnerItem;

  public seedStore = inject(SeedStore);

  get categoryName() {
    return (category: string) => {
      const item = this.seedStore
        .partnerCategoriesOptions()
        .find(({ value }) => value === category);
      return item?.label || '';
    };
  }
}
