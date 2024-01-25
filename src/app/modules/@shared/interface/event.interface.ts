import { DocumentReference, Timestamp } from 'firebase/firestore';

export interface IEventDB {
  id?: string;
  title: string;
  date: Timestamp;
  active: boolean;
  images: string[];
  streamURL: string;
  bannerURL: string;
  addressURL: string;
  addressName: string;
  contentHTML: string;
  addressMapHTML: string;
  creationDate: Timestamp;
  shortDescription: string;
  dateReleaseStream: Timestamp;
  partners: DocumentReference[];
  userCreator: DocumentReference;
}

export interface IEventItem
  extends Omit<
    IEventDB,
    'date' | 'partners' | 'creationDate' | 'dateReleaseStream' | 'userCreator'
  > {
  id: string;
  date: Date;
  partners: string[];
  creationDate: Date;
  userCreator: string;
  dateReleaseStream: Date;
}

export interface IEventTestimonialDB {
  active: boolean;
  comment: string;
  authorName: string;
  creationDate: Timestamp;
  event: DocumentReference;
  userCreator: DocumentReference;
}

export interface IEventTicketDB {
  id?: string;
  number: string;
  active: boolean;
  userName: string;
  eventName: string;
  eventDate: Timestamp;
  creationDate: Timestamp;
  user: DocumentReference;
  event: DocumentReference;
}

export interface IEventTicketItem
  extends Omit<
    IEventTicketDB,
    'creationDate' | 'eventDate' | 'user' | 'event'
  > {
  user: string;
  event: string;
  eventDate: Date;
  creationDate: Date;
}
