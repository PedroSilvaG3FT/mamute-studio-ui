import { Injectable, inject } from '@angular/core';
import { Timestamp } from 'firebase/firestore';
import { FIREBASE_COLLECTION } from '../../@core/firebase/@constans/firebase-collection.contant';
import { FirebaseAuthenticationService } from '../../@core/firebase/firebase-authentication.service';
import { FirebaseCollectionBase } from '../../@core/firebase/firebase-collection.base';
import { IPartnerDB, IPartnerItem } from '../interface/partner.interface';

@Injectable({ providedIn: 'root' })
export class PartnerModel {
  public base = new FirebaseCollectionBase(FIREBASE_COLLECTION.partner);
  public auth = inject(FirebaseAuthenticationService);

  constructor() {}

  public buildItem(model: IPartnerDB): IPartnerItem {
    return {
      ...model,
      id: String(model.id),
      category: model.category?.id,
      userCreator: model.userCreator?.id,
      creationDate: model.creationDate?.toDate(),
    };
  }

  public buildList(model: IPartnerDB[]) {
    return model.map((item) => this.buildItem(item));
  }

  public buildRegisterDTO(model: IPartnerItem): IPartnerDB {
    return {
      name: model.name || '',
      email: model.email || '',
      active: !!model.active,
      imageURL: model.imageURL || '',
      telephone: model.telephone || '',
      portfolioURL: model.portfolioURL || '',
      occupationDescription: model.occupationDescription || '',

      creationDate: Timestamp.now(),
      userCreator: this.auth.getUserReference(),
      category: this.base.getDocumentReference(
        model.category,
        FIREBASE_COLLECTION.partnerCategory
      ),
    };
  }
}
