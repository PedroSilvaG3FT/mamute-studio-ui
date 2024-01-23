import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { AuthStore } from '../../../../store/auth.store';
import { SeedStore } from '../../../../store/seed.store';
import { ModalRequestLoginComponent } from '../../../@shared/components/modal-request-login/modal-request-login.component';
import { IPrayerWallItem } from '../../../@shared/interface/prayer-wall.interface';

@Component({
  standalone: true,
  selector: 'portal-card-prayer',
  imports: [DatePipe, MatIconModule],
  styleUrl: './portal-card-prayer.component.scss',
  templateUrl: './portal-card-prayer.component.html',
})
export class PortalCardPrayerComponent {
  @Input() isPraying: boolean = false;
  @Input({ required: true }) data: IPrayerWallItem = {} as IPrayerWallItem;

  @Output() onPrayingToggle = new EventEmitter();

  public authStore = inject(AuthStore);
  public seedStore = inject(SeedStore);

  constructor(public dialog: MatDialog) {}

  get categoryName() {
    return (category: string) => {
      const item = this.seedStore
        .prayerCategoriesOptions()
        .find(({ value }) => value === category);
      return item?.label || '';
    };
  }

  public handleTogglePray() {
    if (!this.authStore.isLogged()) {
      this.dialog.open(ModalRequestLoginComponent);
      return;
    }

    this.onPrayingToggle.emit(!this.isPraying);
  }
}
