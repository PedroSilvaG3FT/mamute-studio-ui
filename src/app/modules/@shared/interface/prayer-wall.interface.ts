import { DocumentReference, Timestamp } from 'firebase/firestore';

export interface IPrayerWallDB {
  id?: string;
  active: boolean;
  authorName: string;
  description: string;
  creationDate: Timestamp;
  category: DocumentReference;
  peoplePraying: DocumentReference[];
  userCreator: DocumentReference | null;
  userApprover: DocumentReference | null;
}

export interface IPrayerWallItem
  extends Omit<
    IPrayerWallDB,
    | 'category'
    | 'userCreator'
    | 'creationDate'
    | 'userApprover'
    | 'peoplePraying'
  > {
  category: string;
  creationDate: Date;
  peoplePraying: string[];
  userCreator: string | null;
  userApprover: string | null;
}
