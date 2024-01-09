import { Injectable } from '@angular/core';
import { QueryFieldFilterConstraint } from 'firebase/firestore';
import { FirebaseCollectionBase } from '../../@core/firebase/firebase-collection.base';

@Injectable({ providedIn: 'root' })
export class FirebaseExampleService extends FirebaseCollectionBase {
  constructor() {
    super('CollectionExample');
  }

  public override getAll<Data>(): Promise<Data> {
    const filter: QueryFieldFilterConstraint[] = [
      // where('example_key', '==', 'example_value'),
    ];

    return this.handlerGetAll(filter);
  }
}
