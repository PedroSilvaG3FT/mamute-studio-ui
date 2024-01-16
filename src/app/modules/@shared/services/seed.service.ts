import { Injectable, inject } from '@angular/core';
import { SeedStore } from '../../../store/seed.store';
import { ICategoryDB } from '../interface/category.interface';
import { DatabaseService } from './database.service';

@Injectable({ providedIn: 'root' })
export class SeedService {
  private seedStore = inject(SeedStore);

  constructor(private databaseService: DatabaseService) {}

  public async init() {
    try {
      if (!this.seedStore.isEnableUpdate()) return;

      const { partnerCategory, prayerCategory } = this.databaseService;

      const resPrayerCategory = await prayerCategory.getAll<ICategoryDB[]>();
      const resPartnerCategory = await partnerCategory.getAll<ICategoryDB[]>();

      this.seedStore.setPrayerCategories(resPrayerCategory);
      this.seedStore.setPartnerCategories(resPartnerCategory);

      this.seedStore.setLastUpdate(new Date());
    } catch (error) {
      console.warn('[seed > init] ', error);
    }
  }
}
