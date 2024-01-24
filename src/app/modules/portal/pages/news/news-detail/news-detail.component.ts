import { DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { LoadingStore } from '../../../../../store/loading.store';
import { SeedStore } from '../../../../../store/seed.store';
import { FirebaseStorageService } from '../../../../@core/firebase/firebase-storage.service';
import { AlertService } from '../../../../@core/services/alert.service';
import {
  INewsDB,
  INewsItem,
} from '../../../../@shared/interface/news.interface';
import {
  IPartnerDB,
  IPartnerItem,
} from '../../../../@shared/interface/partner.interface';
import { DatabaseService } from '../../../../@shared/services/database.service';
import { PortalGalleryComponent } from '../../../components/portal-gallery/portal-gallery.component';
import { PortalPartnerListComponent } from '../../../components/portal-partner-list/portal-partner-list.component';

@Component({
  standalone: true,
  selector: 'portal-news-detail',
  styleUrl: './news-detail.component.scss',
  templateUrl: './news-detail.component.html',
  imports: [
    DatePipe,
    RouterModule,
    PortalGalleryComponent,
    PortalPartnerListComponent,
  ],
})
export class NewsDetailComponent {
  public newsId = signal('');
  public galleryImages: string[] = [];
  public partners: IPartnerItem[] = [];
  public news: INewsItem = {} as INewsItem;

  public seedStore = inject(SeedStore);
  public loadingStore = inject(LoadingStore);

  constructor(
    private alertService: AlertService,
    private activatedRoute: ActivatedRoute,
    private databaseService: DatabaseService,
    private firebaseStorageService: FirebaseStorageService
  ) {}

  public get getCategory() {
    return (category: string) => {
      const item = this.seedStore
        .newsCategoriesOptions()
        .find((item) => item.value === category);

      return item?.label || '--';
    };
  }

  ngOnInit() {
    this.newsId.set(this.activatedRoute.snapshot.params['id']);
    this.getNews();
  }

  public getNews() {
    this.loadingStore.setState(true);

    this.databaseService.news
      .getById<INewsDB>(this.newsId())
      .then((response) => {
        this.news = this.databaseService._model.news.buildItem(response);

        this.getPartners();
        this.initGallery();
      })
      .catch((error) => this.alertService.snackDefaultResponseError(error))
      .finally(() => this.loadingStore.setState(false));
  }

  public async initGallery() {
    try {
      for await (let path of this.news.images) {
        const url = await this.firebaseStorageService.download(path, true);
        this.galleryImages.push(url);
      }
    } catch (error) {
      throw error;
    }
  }

  public async getPartners() {
    try {
      for await (let item of this.news.partners) {
        const response = await this.databaseService.partner.getById<IPartnerDB>(
          item
        );

        const partner = this.databaseService._model.partner.buildItem(response);
        this.partners.push(partner);
      }
    } catch (error) {
      throw error;
    }
  }
}
