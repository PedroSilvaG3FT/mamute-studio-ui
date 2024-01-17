import { DocumentReference, Timestamp } from 'firebase/firestore';

export interface IEventDB {
  id?: string;
  title: string;
  date: Timestamp;
  active: boolean;
  streamURL: string;
  bannerURL: string;
  addressURL: string;
  addressName: string;
  contentHTML: string;
  addressMapHTML: string;
  creationDate: Timestamp;
  shortDescription: string;
  dateReleaseStream: Timestamp;
  userCreator: DocumentReference;
}

export interface IEventPartnerDB {
  creationDate: Timestamp;
  event: DocumentReference;
  partner: DocumentReference;
  userCreator: DocumentReference;
}

export interface IEventPhotoGalleryDB {
  url: string;
  active: boolean;
  creationDate: Timestamp;
  event: DocumentReference;
  userCreator: DocumentReference;
}

export interface IEventTestimonialDB {
  active: boolean;
  comment: string;
  authorName: string;
  creationDate: Timestamp;
  event: DocumentReference;
  userCreator: DocumentReference;
}

export interface IEventItem
  extends Omit<
    IEventDB,
    'date' | 'creationDate' | 'dateReleaseStream' | 'userCreator'
  > {
  id: string;
  date: Date;
  creationDate: Date;
  userCreator: string;
  dateReleaseStream: Date;
}
