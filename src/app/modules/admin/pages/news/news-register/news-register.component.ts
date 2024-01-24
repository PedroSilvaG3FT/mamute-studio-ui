import { Component, computed, inject, signal } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthStore } from '../../../../../store/auth.store';
import { LoadingStore } from '../../../../../store/loading.store';
import { SeedStore } from '../../../../../store/seed.store';
import { AppFormGeneratorComponent } from '../../../../@core/components/_form-generator/app-form-generator/app-form-generator.component';
import { FormGeneratorService } from '../../../../@core/components/_form-generator/form-generator.service';
import { FIREBASE_STORAGE_PATH } from '../../../../@core/firebase/@constans/firebase-storage.contant';
import { FirebaseStorageService } from '../../../../@core/firebase/firebase-storage.service';
import { AlertService } from '../../../../@core/services/alert.service';
import { DownloadUtil } from '../../../../@core/util/download.util';
import { AppPageNavComponent } from '../../../../@shared/components/app-page-nav/app-page-nav.component';
import {
  INewsDB,
  INewsItem,
} from '../../../../@shared/interface/news.interface';
import { DatabaseService } from '../../../../@shared/services/database.service';
import { AdminGalleryRegisterComponent } from '../../../components/admin-gallery-register/admin-gallery-register.component';
import { AdminPartnerSelectionComponent } from '../../../components/admin-partner-selection/admin-partner-selection.component';

interface INewsForm extends INewsItem {}

@Component({
  standalone: true,
  selector: 'app-news-register',
  styleUrl: './news-register.component.scss',
  templateUrl: './news-register.component.html',
  imports: [
    RouterLink,
    MatTabsModule,
    AppPageNavComponent,
    AppFormGeneratorComponent,
    AdminGalleryRegisterComponent,
    AdminPartnerSelectionComponent,
  ],
})
export class NewsRegisterComponent {
  public readonly galleryPath = FIREBASE_STORAGE_PATH.news;

  public newsId = signal('');
  public news: INewsItem = {} as INewsItem;
  public isNew = computed(() => !this.newsId());
  public pageTitle = computed(() =>
    !!this.isNew() ? `Cadastro de notícia` : `Edição de notícia`
  );

  public countImageChange = signal(0);
  public isImageUpdated = computed(() => this.countImageChange() > 2);

  public seedStore = inject(SeedStore);
  public authStore = inject(AuthStore);
  public loadingStore = inject(LoadingStore);
  public form = this.formGeneratorService.init<INewsForm>([
    [
      {
        label: 'Ativo',
        name: 'active',
        type: 'checkbox',
        additional: { checkbox: { isToggle: true } },
      },
    ],
    [
      { name: 'title', type: 'input', label: 'Título' },
      { name: 'category', type: 'select', label: 'Categoria' },
    ],
    [{ name: 'shortDescription', type: 'textarea', label: 'Descrição curta' }],
    [{ name: 'contentHTML', type: 'text-editor', label: 'Conteúdo' }],
    [{ name: 'bannerURL', type: 'image-cropper', label: 'Capa' }],
  ]);

  constructor(
    private router: Router,
    private alertService: AlertService,
    private activatedRoute: ActivatedRoute,
    private databaseService: DatabaseService,
    private formGeneratorService: FormGeneratorService,
    private firebaseStorageService: FirebaseStorageService
  ) {}

  ngOnInit() {
    this.newsId.set(this.activatedRoute.snapshot.params['id']);
    if (!this.isNew()) this.getNews();

    this.form.setOptionsField(
      'category',
      this.seedStore.newsCategoriesOptions()
    );

    this.form.group.controls.bannerURL.valueChanges.subscribe(() => {
      this.countImageChange.update((value) => value + 1);
    });
  }

  public getNews() {
    this.loadingStore.setState(true);
    this.databaseService.news
      .getById<INewsDB>(this.newsId())
      .then((response) => {
        this.news = this.databaseService._model.news.buildItem(response);

        this.form.group.patchValue({
          title: this.news.title,
          active: this.news.active,
          category: this.news.category,
          bannerURL: this.news.bannerURL,
          contentHTML: this.news.contentHTML,
          shortDescription: this.news.shortDescription,
        });

        if (!this.news.bannerURL)
          this.countImageChange.update((value) => value + 1);

        this.form.setImageURLToCropper('bannerURL', this.news.bannerURL);
      })
      .catch((error) => this.alertService.snackDefaultResponseError(error))
      .finally(() => this.loadingStore.setState(false));
  }

  public handleSubmit(model: INewsForm) {
    if (this.isNew()) this.handleCreate(model);
    else this.handleUpdate(model);
  }

  public async handleCreateImageUrl(fileBlobURL: string) {
    try {
      const path = `${this.firebaseStorageService.getUserPath()}/${
        FIREBASE_STORAGE_PATH.news
      }`;

      const file = await DownloadUtil.stringBlobToFile(fileBlobURL);
      const response = await this.firebaseStorageService.upload(file, path);
      return this.firebaseStorageService.download(
        response.metadata.fullPath,
        true
      );
    } catch (error) {
      throw error;
    }
  }

  public async handleCreate(model: INewsForm) {
    try {
      if (!model.bannerURL) {
        this.alertService.snackBar.open(
          'Insira uma imagem para a noticia',
          'fechar'
        );
        return;
      }

      this.loadingStore.setState(true);

      if (!!model.bannerURL) {
        const imageURL = await this.handleCreateImageUrl(model.bannerURL);
        model.bannerURL = imageURL;
      }

      model.authorName = this.authStore.userData().name;
      const newsDTO = this.databaseService._model.news.buildRegisterDTO(model);
      const response = await this.databaseService.news.create(newsDTO);

      this.router.navigate(['/admin/news/register', response.id]);
      this.loadingStore.setState(false);
    } catch (error) {
      this.loadingStore.setState(false);
      this.alertService.snackDefaultResponseError(error);
    }
  }

  public async handleUpdate(model: INewsForm) {
    try {
      this.loadingStore.setState(true);

      if (!!model.bannerURL && this.isImageUpdated()) {
        const imageURL = await this.handleCreateImageUrl(model.bannerURL);
        model.bannerURL = imageURL;
      } else model.bannerURL = this.news.bannerURL;

      const newsDTO = this.databaseService._model.news.buildRegisterDTO({
        ...this.news,
        ...model,
      });

      await this.databaseService.news.update(this.newsId(), newsDTO);

      this.news = {
        ...this.news,
        ...model,
        images: model.images || this.news.images,
        partners: model.partners || this.news.partners,
      };

      this.loadingStore.setState(false);
    } catch (error) {
      this.loadingStore.setState(false);
      this.alertService.snackDefaultResponseError(error);
    }
  }

  public handlePartnerChange(partners: string[]) {
    this.handleUpdate({ ...this.news, partners });
  }

  public handleGalleryChange(images: string[]) {
    this.handleUpdate({ ...this.news, images });
  }
}
