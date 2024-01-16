import { Injectable, inject } from '@angular/core';
import { Timestamp } from 'firebase/firestore';
import { FirebaseAuthenticationService } from '../../@core/firebase/firebase-authentication.service';
import { IEventDB, IEventItem } from '../interface/event.interface';

@Injectable({ providedIn: 'root' })
export class EventModel {
  public auth = inject(FirebaseAuthenticationService);

  constructor() {}

  public buildItem(model: IEventDB): IEventItem {
    return {
      ...model,
      id: String(model.id),
      date: model.date?.toDate(),
      userCreator: model.userCreator?.id,
      creationDate: model.creationDate?.toDate(),
      dateReleaseStream: model.dateReleaseStream?.toDate(),
    };
  }

  public buildList(model: IEventDB[]) {
    return model.map((item) => this.buildItem(item));
  }

  public buildRegisterDTO(model: IEventItem): IEventDB {
    return {
      active: !!model.active,
      title: model.title || '',
      streamURL: model.streamURL || '',
      bannerURL: model.bannerURL || '',
      addressURL: model.addressURL || '',
      addressName: model.addressName || '',
      contentHTML: model.contentHTML || '',
      date: Timestamp.fromDate(model.date),
      addressMapHTML: model.addressMapHTML || '',
      dateReleaseStream: Timestamp.fromDate(model.dateReleaseStream),

      creationDate: Timestamp.now(),
      userCreator: this.auth.getUserReference(),
    };
  }
}
