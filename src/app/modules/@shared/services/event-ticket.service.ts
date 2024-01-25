import { Injectable } from '@angular/core';
import { getDocs, query, where } from 'firebase/firestore';
import { FIREBASE_COLLECTION } from '../../@core/firebase/@constans/firebase-collection.contant';
import { FirebaseCollectionBase } from '../../@core/firebase/firebase-collection.base';

@Injectable({ providedIn: 'root' })
export class EventTicketService extends FirebaseCollectionBase {
  constructor() {
    super(FIREBASE_COLLECTION.eventTicket);
  }

  public async getByUserId<Data>(userId: string) {
    try {
      const userRef = this.getDocumentReference(
        userId,
        FIREBASE_COLLECTION.user
      );

      const snapshot = await getDocs(
        query(this.collection, where('user', '==', userRef))
      );

      const response = await this._helper.getCollectionData<Data>(snapshot);
      return response as Data[];
    } catch (error) {
      throw error;
    }
  }

  public async getByEventId<Data>(eventId: string) {
    try {
      const eventRef = this.getDocumentReference(
        eventId,
        FIREBASE_COLLECTION.event
      );

      const snapshot = await getDocs(
        query(this.collection, where('event', '==', eventRef))
      );

      const response = await this._helper.getCollectionData<Data>(snapshot);
      return response as Data[];
    } catch (error) {
      throw error;
    }
  }
}
