import { DocumentReference, Timestamp } from 'firebase/firestore';

export interface IUserDB {
  uid: string;
  name: string;
  email: string;
  active: boolean;
  profileImageURL: string;
  role: DocumentReference;
  creationDate: Timestamp | Date;
}
