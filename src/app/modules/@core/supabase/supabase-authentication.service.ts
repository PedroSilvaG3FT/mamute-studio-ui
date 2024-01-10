import { Injectable } from '@angular/core';
import {
  SignInWithPasswordCredentials,
  SignUpWithPasswordCredentials,
} from '@supabase/supabase-js';
import { SupabaseClientBase } from './supabase-client.base';

export interface Profile {
  id?: string;
  username: string;
  website: string;
  avatar_url: string;
}

@Injectable({ providedIn: 'root' })
export class SupabaseAuthenticationService extends SupabaseClientBase {
  constructor() {
    super('profiles');
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
