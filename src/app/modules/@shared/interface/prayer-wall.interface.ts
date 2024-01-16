import { DocumentReference, Timestamp } from 'firebase/firestore';

export interface IPrayerWallDB {
  active: boolean;
  authorName: string;
  description: string;
  creationDate: Timestamp;
  category: DocumentReference;
  userApprover: DocumentReference | null;
}
