import { Injectable, inject } from '@angular/core';
import { Timestamp } from 'firebase/firestore';
import { FIREBASE_COLLECTION } from '../../@core/firebase/@constans/firebase-collection.contant';
import { FirebaseAuthenticationService } from '../../@core/firebase/firebase-authentication.service';
import { FirebaseCollectionBase } from '../../@core/firebase/firebase-collection.base';
import {
  IPrayerWallDB,
  IPrayerWallItem,
} from '../interface/prayer-wall.interface';

@Injectable({ providedIn: 'root' })
export class PrayerWallModel {
  public auth = inject(FirebaseAuthenticationService);
  private base = new FirebaseCollectionBase(FIREBASE_COLLECTION.prayerWall);

  constructor() {}

  public buildItem(model: IPrayerWallDB): IPrayerWallItem {
    return {
      ...model,
      id: String(model.id),
      category: model.category?.id,
      userCreator: model.userCreator?.id || null,
      userApprover: model.userApprover?.id || null,
      creationDate: model.creationDate?.toDate(),
    };
  }

  public buildList(model: IPrayerWallDB[]) {
    return model.map((item) => this.buildItem(item));
  }

  public buildRegisterDTO(model: IPrayerWallItem): IPrayerWallDB {
    return {
      userApprover: null,
      active: !!model.active,
      creationDate: Timestamp.now(),
      authorName: model.authorName || '',
      description: model.description || '',
      userCreator: this.auth.getUserReference(),
      category: this.base.getDocumentReference(
        model.category,
        FIREBASE_COLLECTION.prayerCategory
      ),
    };
  }
}
