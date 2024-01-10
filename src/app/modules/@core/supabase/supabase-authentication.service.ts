import { Injectable } from '@angular/core';
import {
  SignInWithPasswordCredentials,
  SignUpWithPasswordCredentials,
} from '@supabase/supabase-js';
import { SupabaseClientBase } from './supabase-client.base';

@Injectable({ providedIn: 'root' })
export class SupabaseAuthenticationService extends SupabaseClientBase {
  constructor() {
    super('User');
  }

  public signUp(data: SignUpWithPasswordCredentials) {
    return this.supabase.auth.signUp(data);
  }

  public signIn(data: SignInWithPasswordCredentials) {
    return this.supabase.auth.signInWithPassword(data);
  }

  public signOut() {
    return this.supabase.auth.signOut();
  }
}
