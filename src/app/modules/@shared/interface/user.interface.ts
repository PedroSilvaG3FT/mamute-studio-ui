import { DocumentReference, Timestamp } from 'firebase/firestore';

export interface IUserDB {
  id?: string;
  uid: string;
  name: string;
  email: string;
  active: boolean;
  phoneNumber: string;
  profileImageURL: string;
  role: DocumentReference;
  creationDate: Timestamp;
}

export interface IUserItem extends Omit<IUserDB, 'role' | 'creationDate'> {
  role: string;
  creationDate: Date;
}
