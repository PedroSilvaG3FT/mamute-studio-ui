import { DocumentReference, Timestamp } from 'firebase/firestore';

export interface IPrayerWallDB {
  id?: string;
  active: boolean;
  authorName: string;
  description: string;
  creationDate: Timestamp;
  category: DocumentReference;
  userCreator: DocumentReference | null;
  userApprover: DocumentReference | null;
}

export interface IPrayerWallItem
  extends Omit<
    IPrayerWallDB,
    'category' | 'creationDate' | 'userApprover' | 'userCreator'
  > {
  category: string;
  creationDate: Date;
  userCreator: string | null;
  userApprover: string | null;
}
