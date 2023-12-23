import {
  DocumentData,
  DocumentSnapshot,
  QuerySnapshot,
} from 'firebase/firestore';

export type ListDocumentSnapshot = QuerySnapshot<DocumentData>;
export type SingleDocumentSnapshot = DocumentSnapshot<
  DocumentData,
  DocumentData
>;
