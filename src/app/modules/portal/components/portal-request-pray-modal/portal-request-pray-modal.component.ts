import { Component, inject } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthStore } from '../../../../store/auth.store';
import { LoadingStore } from '../../../../store/loading.store';
import { SeedStore } from '../../../../store/seed.store';
import { AppFormGeneratorComponent } from '../../../@core/components/_form-generator/app-form-generator/app-form-generator.component';
import { FormGeneratorService } from '../../../@core/components/_form-generator/form-generator.service';
import { FirebaseAuthenticationService } from '../../../@core/firebase/firebase-authentication.service';
import { AlertService } from '../../../@core/services/alert.service';
import {
  IPrayerWallDB,
  IPrayerWallItem,
} from '../../../@shared/interface/prayer-wall.interface';
import { DatabaseService } from '../../../@shared/services/database.service';

@Component({
  standalone: true,
  imports: [AppFormGeneratorComponent],
  selector: 'portal-request-pray-modal',
  styleUrl: './portal-request-pray-modal.component.scss',
  templateUrl: './portal-request-pray-modal.component.html',
})
export class PortalRequestPrayModalComponent {
  public seedStore = inject(SeedStore);
  public authStore = inject(AuthStore);
  public loadingStore = inject(LoadingStore);
  public form = this.formGeneratorService.init<IPrayerWallItem>([
    [
      {
        type: 'select',
        label: 'Motivo',
        name: 'category',
        validators: [Validators.required],
      },
    ],
    [
      {
        type: 'textarea',
        name: 'description',
        validators: [Validators.required],
        label: 'Descreva o seu pedido de oração',
      },
    ],
  ]);

  constructor(
    private alertService: AlertService,
    private databaseService: DatabaseService,
    private formGeneratorService: FormGeneratorService,
    public dialogRef: MatDialogRef<PortalRequestPrayModalComponent>,
    private firebaseAuthenticationService: FirebaseAuthenticationService
  ) {}

  ngOnInit() {
    this.form.setOptionsField(
      'category',
      this.seedStore.prayerCategoriesOptions()
    );
  }

  public handleSubmit(model: IPrayerWallItem) {
    this.loadingStore.setState(true);

    const prayDTO = this.databaseService._model.prayerWall.buildRegisterDTO({
      ...model,
      userCreator: this.authStore.idUserLogged(),
    });

    this.databaseService.prayerWall
      .create<IPrayerWallDB>({
        ...prayDTO,
        active: false,
        authorName: this.authStore.userData()?.name || '',
      })
      .then(() => {
        this.alertService.snackBar.open(
          'O seu pedido de oração foi registrado e em breve será liberado em nosso mural',
          'Fechar',
          { duration: 10000 }
        );

        this.dialogRef.close();
      })
      .catch((error) => this.alertService.snackDefaultResponseError(error))
      .finally(() => this.loadingStore.setState(false));
  }
}
