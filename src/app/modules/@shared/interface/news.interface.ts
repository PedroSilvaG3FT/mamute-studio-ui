import { DocumentReference, Timestamp } from 'firebase/firestore';

export interface INewsDB {
  id?: string;
  title: string;
  active: boolean;
  images: string[];
  bannerURL: string;
  authorName: string;
  contentHTML: string;
  creationDate: Timestamp;
  shortDescription: string;
  category: DocumentReference;
  partners: DocumentReference[];
  userCreator: DocumentReference;
}

export interface INewsPartnerDB {
  creationDate: Timestamp;
  news: DocumentReference;
  partner: DocumentReference;
  userCreator: DocumentReference;
}

export interface INewsItem
  extends Omit<
    INewsDB,
    'category' | 'creationDate' | 'userCreator' | 'partners'
  > {
  category: string;
  partners: string[];
  userCreator: string;
  creationDate: Date;
}
