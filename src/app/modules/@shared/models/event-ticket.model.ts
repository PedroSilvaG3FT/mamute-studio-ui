import { Injectable, inject } from '@angular/core';
import { Timestamp } from 'firebase/firestore';
import { FIREBASE_COLLECTION } from '../../@core/firebase/@constans/firebase-collection.contant';
import { FirebaseAuthenticationService } from '../../@core/firebase/firebase-authentication.service';
import { FirebaseCollectionBase } from '../../@core/firebase/firebase-collection.base';
import { IEventTicketDB, IEventTicketItem } from '../interface/event.interface';

@Injectable({ providedIn: 'root' })
export class EventTicketModel {
  public auth = inject(FirebaseAuthenticationService);
  private base = new FirebaseCollectionBase(FIREBASE_COLLECTION.event);

  constructor() {}

  public buildItem(model: IEventTicketDB): IEventTicketItem {
    return {
      ...model,
      id: String(model.id),
      user: model.user?.id,
      event: model.event?.id,
      eventDate: model.eventDate?.toDate(),
      creationDate: model.creationDate?.toDate(),
    };
  }

  public buildList(model: IEventTicketDB[]) {
    return model.map((item) => this.buildItem(item));
  }

  public buildRegisterDTO(model: IEventTicketItem): IEventTicketDB {
    return {
      active: !!model.active,
      number: model.number || '',
      creationDate: Timestamp.now(),
      userName: model.userName || '',
      eventName: model.eventName || '',
      user: this.auth.getUserReference(),
      eventBanner: model.eventBanner || '',
      eventDate: Timestamp.fromDate(model.eventDate),
      event: this.base.getDocumentReference(
        model.event,
        FIREBASE_COLLECTION.event
      ),
    };
  }
}
