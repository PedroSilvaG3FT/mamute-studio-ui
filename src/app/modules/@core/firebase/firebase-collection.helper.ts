import {
  ListDocumentSnapshot,
  SingleDocumentSnapshot,
} from './@types/firebase.type';

export class FirebaseCollectionHelper {
  public getDocumentData<Data>(snapshot: SingleDocumentSnapshot) {
    try {
      const documentData = snapshot.data();

      if (!Object.keys(Object(documentData)).length || !documentData) {
        throw new Error('Document not found');
      }

      return { ...documentData, id: snapshot.id } as Data;
    } catch (error) {
      throw error;
    }
  }

  public getCollectionData<Data>(snapshot: ListDocumentSnapshot) {
    return snapshot.docs.map((doc) => {
      const document = { ...doc.data(), id: doc.id };
      return document;
    }) as Data;
  }
}
