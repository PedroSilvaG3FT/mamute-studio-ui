import { Injectable } from '@angular/core';
import { Timestamp } from 'firebase/firestore';
import { FIREBASE_COLLECTION } from '../../@core/firebase/@constans/firebase-collection.contant';
import { FirebaseCollectionBase } from '../../@core/firebase/firebase-collection.base';
import { IUserDB, IUserItem } from '../interface/user.interface';

@Injectable({ providedIn: 'root' })
export class UserModel {
  private base = new FirebaseCollectionBase(FIREBASE_COLLECTION.user);

  constructor() {}

  public buildItem(model: IUserDB): IUserItem {
    return {
      ...model,
      id: String(model.id),
      role: model.role?.id,
      creationDate: model.creationDate?.toDate(),
    };
  }

  public buildList(model: IUserDB[]) {
    return model.map((item) => this.buildItem(item));
  }

  public buildRegisterDTO(model: IUserItem): IUserDB {
    return {
      uid: model.uid || '',
      name: model.name || '',
      active: !!model.active,
      email: model.email || '',
      creationDate: Timestamp.now(),
      phoneNumber: model.phoneNumber || '',
      profileImageURL: model.profileImageURL || '',
      role: this.base.getDocumentReference(
        model.role,
        FIREBASE_COLLECTION.userRole
      ),
    };
  }
}
