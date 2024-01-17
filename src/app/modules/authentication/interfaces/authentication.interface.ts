import { IUserDB } from '../../@shared/interface/user.interface';

export interface IAuthCredential {
  email: string;
  password: string;
}

export interface IAuthForgotPassword {
  email: string;
}

export interface IAuthRegister extends IUserDB {
  password?: string;
}
