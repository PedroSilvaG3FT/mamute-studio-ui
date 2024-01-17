import { Injectable } from '@angular/core';
import { FirebaseAuthenticationService } from '../../@core/firebase/firebase-authentication.service';

@Injectable({ providedIn: 'root' })
export class UserService extends FirebaseAuthenticationService {
  constructor() {
    super();
  }
}
