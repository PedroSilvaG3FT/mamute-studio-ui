import { DocumentReference, Timestamp } from 'firebase/firestore';

export interface IPartnerDB {
  id?: string;
  name: string;
  email: string;
  active: boolean;
  imageURL: string;
  telephone: string;
  portfolioURL: string;
  creationDate: Timestamp;
  category: DocumentReference;
  occupationDescription: string;
  userCreator: DocumentReference;
}

export interface IPartnerAdvertingDB {
  link: string;
  title: string;
  bannerURL: string;
  endDate: Timestamp;
  description: string;
  startDate: Timestamp;
  creationDate: Timestamp;
  partner: DocumentReference;
  userCreator: DocumentReference;
}

export interface IPartnerItem
  extends Omit<IPartnerDB, 'category' | 'userCreator' | 'creationDate'> {
  category: string;
  creationDate: Date;
  userCreator: string;
}
