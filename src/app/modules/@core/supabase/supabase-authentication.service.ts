import { Injectable } from '@angular/core';
import {
  AuthSession,
  SignInWithPasswordCredentials,
  SignUpWithPasswordCredentials,
} from '@supabase/supabase-js';
import { SupabaseTableBase } from './supabase-table.base';

export interface Profile {
  id?: string;
  username: string;
  website: string;
  avatar_url: string;
}

@Injectable({ providedIn: 'root' })
export class SupabaseAuthenticationService extends SupabaseTableBase {
  public _session: AuthSession | null = null;

  constructor() {
    super('profiles');
  }

  get session() {
    this.supabase.auth
      .getSession()
      .then(({ data }) => (this._session = data.session));

    return this._session;
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
