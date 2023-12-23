import { Injectable } from '@angular/core';
import { QueryFieldFilterConstraint } from 'firebase/firestore';
import { FirebaseCollectionBase } from '../../@core/firebase/firebase-collection.base';

@Injectable({ providedIn: 'root' })
export class FirebaseExampleService extends FirebaseCollectionBase {
  constructor() {
    super('PrayerWall');
  }

  public override getAll<Data>(): Promise<Data> {
    const filter: QueryFieldFilterConstraint[] = [
      // where('active', '==', true),
      // where('authorName', '==', 'Junior Silva'),
    ];

    return this.handlerGetAll(filter);
  }
}
