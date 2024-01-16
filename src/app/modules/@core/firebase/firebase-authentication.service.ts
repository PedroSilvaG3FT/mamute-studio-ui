import { Injectable, inject } from '@angular/core';
import {
  Auth,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { AuthStore } from '../../../store/auth.store';
import { UserRole } from '../../authentication/enums/user-role.enum';
import {
  IAuthCredential,
  IAuthRegister,
} from '../../authentication/interfaces/authentication.interface';
import { FIREBASE_COLLECTION } from './@constans/firebase-collection.contant';
import { FirebaseCollectionBase } from './firebase-collection.base';

@Injectable({ providedIn: 'root' })
export class FirebaseAuthenticationService extends FirebaseCollectionBase {
  private auth: Auth;
  private authStore = inject(AuthStore);

  constructor() {
    super(FIREBASE_COLLECTION.user);
    this.auth = getAuth();
  }

  public async signUp(data: IAuthRegister, role = UserRole.member) {
    try {
      const response = await createUserWithEmailAndPassword(
        this.auth,
        data.email,
        data.password as string
      );

      const userData = {
        ...data,
        active: true,
        uid: response.user.uid,
        creationDate: new Date(),
        role: `UserRole/${role}`,
      };

      delete userData.password;

      await this.create<IAuthRegister>(userData);

      if (this.auth.currentUser) {
        await updateProfile(this.auth.currentUser, {
          displayName: data.name,
        });
      }

      return response;
    } catch (error) {
      throw error;
    }
  }

  public async signIn({ email, password }: IAuthCredential) {
    try {
      await setPersistence(this.auth, browserSessionPersistence);

      const response = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );

      const refreshToken = response.user.refreshToken;
      const { token: accessToken } = await response.user.getIdTokenResult();

      const data = await this.getByColumn<IAuthRegister>(
        'uid',
        response.user.uid
      );

      const result = {
        ...response,
        user: {
          ...response.user,
          refreshToken,
          accessToken,
          data,
        },
      };

      return result;
    } catch (error) {
      throw error;
    }
  }

  public async recoveryPassword(email: string) {
    return sendPasswordResetEmail(this.auth, email);
  }

  public getUserReference() {
    return this.getDocumentReference(this.authStore.userData().uid);
  }

  public signOut() {
    return signOut(this.auth);
  }
}
