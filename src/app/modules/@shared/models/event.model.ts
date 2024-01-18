import { Injectable, inject } from '@angular/core';
import { Timestamp } from 'firebase/firestore';
import { FIREBASE_COLLECTION } from '../../@core/firebase/@constans/firebase-collection.contant';
import { FirebaseAuthenticationService } from '../../@core/firebase/firebase-authentication.service';
import { FirebaseCollectionBase } from '../../@core/firebase/firebase-collection.base';
import { IEventDB, IEventItem } from '../interface/event.interface';

@Injectable({ providedIn: 'root' })
export class EventModel {
  public auth = inject(FirebaseAuthenticationService);
  private base = new FirebaseCollectionBase(FIREBASE_COLLECTION.event);

  constructor() {}

  public buildItem(model: IEventDB): IEventItem {
    return {
      ...model,
      id: String(model.id),
      date: model.date?.toDate(),
      userCreator: model.userCreator?.id,
      shortDescription: model.shortDescription,
      creationDate: model.creationDate?.toDate(),
      dateReleaseStream: model.dateReleaseStream?.toDate(),
      partners: model.partners?.map((item) => item.id) || [],
    };
  }

  public buildList(model: IEventDB[]) {
    return model.map((item) => this.buildItem(item));
  }

  public buildRegisterDTO(model: IEventItem): IEventDB {
    const partners =
      model.partners
        ?.filter((item) => !!item)
        ?.map((item) =>
          this.base.getDocumentReference(item, FIREBASE_COLLECTION.partner)
        ) || [];

    return {
      partners,
      active: !!model.active,
      title: model.title || '',
      streamURL: model.streamURL || '',
      bannerURL: model.bannerURL || '',
      addressURL: model.addressURL || '',
      addressName: model.addressName || '',
      contentHTML: model.contentHTML || '',
      date: Timestamp.fromDate(model.date),
      addressMapHTML: model.addressMapHTML || '',
      shortDescription: model.shortDescription || '',
      dateReleaseStream: Timestamp.fromDate(model.dateReleaseStream),

      creationDate: Timestamp.now(),
      userCreator: this.auth.getUserReference(),
    };
  }
}
