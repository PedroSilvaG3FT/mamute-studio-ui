import { DocumentReference, Timestamp } from 'firebase/firestore';

export interface IPartnerDB {
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
