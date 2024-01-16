import { DocumentReference, Timestamp } from 'firebase/firestore';

export interface IProductDB {
  price: number;
  title: string;
  active: boolean;
  quantity: number;
  description: string;
  creationDate: Timestamp;
  userCreator: DocumentReference;
}

export interface IProductPhotoGalleryDB {
  imageURL: string;
  creationDate: Timestamp;
  product: DocumentReference;
  userCreator: DocumentReference;
}

export interface IProductSaleDB {
  quantity: number;
  customerName: string;
  creationDate: Timestamp;
  product: DocumentReference;
  userCreator: DocumentReference;
}
