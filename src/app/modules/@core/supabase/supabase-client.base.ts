import { inject } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { AuthStore } from '../../../store/auth.store';
import { SupabaseConnectorService } from './supabase-connector.service';

export class SupabaseClientBase {
  public supabase: SupabaseClient;
  private authStore = inject(AuthStore);
  private _connector = inject(SupabaseConnectorService);

  constructor(public tableName: string) {
    this.supabase = this._connector.supabase;
    this.checkSignInUserSession();
  }

  private checkSignInUserSession() {
    if (!!this.authStore.supabaseToken()) return;

    const credentials = {
      access_token: this.authStore.supabaseToken(),
      refresh_token: this.authStore.supabaseRefreshToken(),
    };

    this.supabase.auth
      .setSession(credentials)
      .then(() => {})
      .catch((error) => {});
  }

  public async getByColumn<Data>(column: string, value: any) {
    try {
      const response = await this.supabase
        .from(this.tableName)
        .select()
        .eq(column, value)
        .single();

      return { ...response, data: response.data as Data };
    } catch (error) {
      throw error;
    }
  }

  public async getAll<Data>(columns: string = '*') {
    try {
      const response = await this.supabase.from(this.tableName).select(columns);
      return { ...response, data: response.data as Data };
    } catch (error) {
      throw error;
    }
  }

  public getById<Data>(id: number) {
    return this.getByColumn<Data>('id', id);
  }

  public async create<Data>(data: Data) {
    try {
      const response = await this.supabase
        .from(this.tableName)
        .insert(data)
        .select()
        .single();
      return { ...response, data: response.data as Data };
    } catch (error) {
      throw error;
    }
  }

  public async update<Data>(data: Partial<Data>, id: number) {
    try {
      const response = await this.supabase
        .from(this.tableName)
        .update(data)
        .eq('id', id)
        .select()
        .single();
      return { ...response, data: response.data as Data };
    } catch (error) {
      throw error;
    }
  }

  public async delete(id: number) {
    try {
      const response = await this.supabase
        .from(this.tableName)
        .delete()
        .eq('id', id);
      return response;
    } catch (error) {
      throw error;
    }
  }
}
