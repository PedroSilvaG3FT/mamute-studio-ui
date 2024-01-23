import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { where } from 'firebase/firestore';
import { AuthStore } from '../../../../../store/auth.store';
import { ModalRequestLoginComponent } from '../../../../@shared/components/modal-request-login/modal-request-login.component';
import {
  IPrayerWallDB,
  IPrayerWallItem,
} from '../../../../@shared/interface/prayer-wall.interface';
import { DatabaseService } from '../../../../@shared/services/database.service';
import { PortalCardPrayerComponent } from '../../../components/portal-card-prayer/portal-card-prayer.component';
import { PortalCardRedirectDetailComponent } from '../../../components/portal-card-redirect-detail/portal-card-redirect-detail.component';
import { PortalRequestPrayModalComponent } from '../../../components/portal-request-pray-modal/portal-request-pray-modal.component';

@Component({
  standalone: true,
  selector: 'portal-home-prayer-wall',
  styleUrl: './home-prayer-wall.component.scss',
  templateUrl: './home-prayer-wall.component.html',
  imports: [PortalCardPrayerComponent, PortalCardRedirectDetailComponent],
})
export class HomePrayerWallComponent {
  public authStore = inject(AuthStore);
  public prayers: IPrayerWallItem[] = [];

  constructor(
    public dialog: MatDialog,
    private databaseService: DatabaseService
  ) {}

  ngOnInit() {
    this.getItems();
  }

  public getItems() {
    this.databaseService.prayerWall
      .getAllSortLimit<IPrayerWallDB[]>('creationDate', 'desc', 4, [
        where('active', '==', true),
      ])
      .then((response) => {
        this.prayers = this.databaseService._model.prayerWall
          .buildList(response)
          .filter(({ active }) => !!active);
      })
      .catch(() => {});
  }

  public handleRequestPray() {
    const component: any = !this.authStore.isLogged()
      ? ModalRequestLoginComponent
      : PortalRequestPrayModalComponent;

    this.dialog.open(component);
  }
}
