import { Timestamp } from 'firebase/firestore';

export interface IAuthCredential {
  email: string;
  password: string;
}

export interface IAuthForgotPassword {
  email: string;
}

export interface IAuthRegister {
  uid: string;
  role: string;
  name: string;
  email: string;
  active: boolean;
  password?: string;
  creationDate: Timestamp | Date;
}
