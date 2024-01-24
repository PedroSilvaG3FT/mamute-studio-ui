import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { where } from 'firebase/firestore';
import {
  IPartnerDB,
  IPartnerItem,
} from '../../../../@shared/interface/partner.interface';
import { DatabaseService } from '../../../../@shared/services/database.service';
import { PortalCardPartnerComponent } from '../../../components/portal-card-partner/portal-card-partner.component';

@Component({
  standalone: true,
  selector: 'portal-home-partner',
  styleUrl: './home-partner.component.scss',
  templateUrl: './home-partner.component.html',
  imports: [PortalCardPartnerComponent, RouterModule],
})
export class HomePartnerComponent {
  public parters: IPartnerItem[] = [];

  constructor(private databaseService: DatabaseService) {}

  ngOnInit() {
    this.getItems();
  }

  public getItems() {
    this.databaseService.partner
      .getAllSortLimit<IPartnerDB[]>('creationDate', 'desc', 4, [
        where('active', '==', 'true'),
      ])
      .then((response) => {
        this.parters = this.databaseService._model.partner
          .buildList(response)
          .filter(({ active }) => !!active);
      })
      .catch(() => {});
  }
}
