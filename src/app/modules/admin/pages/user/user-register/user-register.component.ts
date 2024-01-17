import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LoadingStore } from '../../../../../store/loading.store';
import { AppFormGeneratorComponent } from '../../../../@core/components/_form-generator/app-form-generator/app-form-generator.component';
import { FormGeneratorService } from '../../../../@core/components/_form-generator/form-generator.service';
import { FIREBASE_STORAGE_PATH } from '../../../../@core/firebase/@constans/firebase-storage.contant';
import { FirebaseStorageService } from '../../../../@core/firebase/firebase-storage.service';
import { AlertService } from '../../../../@core/services/alert.service';
import { DownloadUtil } from '../../../../@core/util/download.util';
import { AppPageNavComponent } from '../../../../@shared/components/app-page-nav/app-page-nav.component';
import {
  IUserDB,
  IUserItem,
} from '../../../../@shared/interface/user.interface';
import { DatabaseService } from '../../../../@shared/services/database.service';
import { USER_ROLE_OPTIONS } from '../../../constants/user-role.constant';

interface IUserForm extends IUserItem {}
@Component({
  standalone: true,
  selector: 'app-user-register',
  styleUrl: './user-register.component.scss',
  templateUrl: './user-register.component.html',
  imports: [AppPageNavComponent, RouterLink, AppFormGeneratorComponent],
})
export class UserRegisterComponent {
  public userId = signal('');
  private user: IUserItem = {} as IUserItem;
  public isNew = computed(() => !this.userId());
  public pageTitle = computed(() =>
    !!this.isNew() ? `Cadastro de usuário` : `Edição de usuário`
  );

  public loadingStore = inject(LoadingStore);
  public form = this.formGeneratorService.init<IUserForm>([
    [
      { name: 'name', type: 'input', label: 'Nome' },
      { name: 'role', type: 'select', label: 'Tipo de usuário' },
    ],
    [
      {
        name: 'email',
        type: 'input',
        label: 'Email',
        additional: { inputType: 'email' },
      },
      { name: 'phoneNumber', type: 'input', label: 'Contato' },
    ],
    [
      {
        label: 'Foto',
        type: 'image-cropper',
        name: 'profileImageURL',
      },
    ],
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
    this.userId.set(this.activatedRoute.snapshot.params['id']);
    if (!this.isNew()) this.getUser();

    this.form.setOptionsField('role', USER_ROLE_OPTIONS);
  }

  public getUser() {
    this.loadingStore.setState(true);
    this.databaseService.user
      .getById<IUserDB>(this.userId())
      .then((response) => {
        this.user = this.databaseService._model.user.buildItem(response);
        this.form.group.patchValue({
          name: this.user.name,
          role: this.user.role,
          email: this.user.email,
          phoneNumber: this.user.phoneNumber,
          profileImageURL: this.user.profileImageURL,
        });

        this.form.setImageURLToCropper(
          'profileImageURL',
          this.user.profileImageURL
        );
      })
      .catch((error) => this.alertService.snackDefaultResponseError(error))
      .finally(() => this.loadingStore.setState(false));
  }

  public handleSubmit(model: IUserForm) {
    if (this.isNew()) this.handleCreate(model);
    else this.handleUpdate(model);
  }

  public async handleCreateImageUrl(fileBlobURL: string) {
    try {
      const path = `${this.firebaseStorageService.getUserPath()}/${
        FIREBASE_STORAGE_PATH.user
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

  public async handleCreate(model: IUserForm) {
    try {
      this.loadingStore.setState(true);

      if (!!model.profileImageURL) {
        const imageURL = await this.handleCreateImageUrl(model.profileImageURL);
        model.profileImageURL = imageURL;
      }

      const userDTO = this.databaseService._model.user.buildRegisterDTO(model);
      const response = await this.databaseService.user.signUp({
        ...userDTO,
        password: `Apc.${userDTO.name.split(' ')[0]}`,
      });

      this.router.navigate(['/admin/user/register', response.user.id]);
      this.loadingStore.setState(false);
    } catch (error) {
      console.log(error);
      this.loadingStore.setState(false);
      this.alertService.snackDefaultResponseError(error);
    }
  }

  public async handleUpdate(model: IUserForm) {
    try {
      this.loadingStore.setState(true);

      if (!!model.profileImageURL) {
        const imageURL = await this.handleCreateImageUrl(model.profileImageURL);
        model.profileImageURL = imageURL;
      } else model.profileImageURL = this.user.profileImageURL;

      const userDTO = this.databaseService._model.user.buildRegisterDTO(model);

      await this.databaseService.user.update(this.userId(), userDTO);
      this.loadingStore.setState(false);
    } catch (error) {
      this.loadingStore.setState(false);
      this.alertService.snackDefaultResponseError(error);
    }
  }
}
