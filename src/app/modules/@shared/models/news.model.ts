import { Injectable, inject } from '@angular/core';
import { Timestamp } from 'firebase/firestore';
import { FIREBASE_COLLECTION } from '../../@core/firebase/@constans/firebase-collection.contant';
import { FirebaseAuthenticationService } from '../../@core/firebase/firebase-authentication.service';
import { FirebaseCollectionBase } from '../../@core/firebase/firebase-collection.base';
import { INewsDB, INewsItem } from '../interface/news.interface';

@Injectable({ providedIn: 'root' })
export class NewsModel {
  public auth = inject(FirebaseAuthenticationService);
  private base = new FirebaseCollectionBase(FIREBASE_COLLECTION.news);

  constructor() {}

  public buildItem(model: INewsDB): INewsItem {
    return {
      ...model,
      id: String(model.id),
      category: model.category?.id,
      userCreator: model.userCreator?.id,
      creationDate: model.creationDate?.toDate(),
    };
  }

  public buildList(model: INewsDB[]) {
    return model.map((item) => this.buildItem(item));
  }

  public buildRegisterDTO(model: INewsItem): INewsDB {
    return {
      active: !!model.active,
      title: model.title || '',
      creationDate: Timestamp.now(),
      bannerURL: model.bannerURL || '',
      authorName: model.authorName || '',
      contentHTML: model.contentHTML || '',
      userCreator: this.auth.getUserReference(),
      shortDescription: model.shortDescription || '',
      category: this.base.getDocumentReference(
        model.category,
        FIREBASE_COLLECTION.newsCategory
      ),
    };
  }
}
