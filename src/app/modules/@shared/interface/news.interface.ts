import { DocumentReference, Timestamp } from 'firebase/firestore';

export interface INewsDB {
  title: string;
  active: boolean;
  bannerURL: string;
  contentHTML: string;
  creationDate: Timestamp;
  userCreator: DocumentReference;
}

export interface INewsPartnerDB {
  creationDate: Timestamp;
  news: DocumentReference;
  partner: DocumentReference;
  userCreator: DocumentReference;
}
