import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { ISupabaseBucketCreateOptions } from './@interfaces/supabase-bucket.interface';
import { SupabaseClientBase } from './supabase-client.base';

@Injectable({ providedIn: 'root' })
export class SupabaseBucketService {
  #supabaseClientBase = new SupabaseClientBase('');

  public supabase: SupabaseClient;
  public bucketName: string = 'unrestricted';

  constructor() {
    this.supabase = this.#supabaseClientBase.supabase;
    this.#supabaseClientBase.supabase.storage.from(this.bucketName);
  }

  get bucket() {
    return this.supabase.storage.from(this.bucketName);
  }

  public async getAll() {
    try {
      const response = await this.supabase.storage.listBuckets();
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async get(name: string) {
    try {
      const response = await this.supabase.storage.getBucket(name);
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async empty(name: string) {
    try {
      const response = await this.supabase.storage.emptyBucket(name);
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async delete(name: string) {
    try {
      const response = await this.supabase.storage.deleteBucket(name);
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async create(name: string, options: ISupabaseBucketCreateOptions) {
    try {
      const response = await this.supabase.storage.createBucket(name, options);
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async upload(name: string, options: ISupabaseBucketCreateOptions) {
    try {
      const response = await this.supabase.storage.updateBucket(name, options);
      return response;
    } catch (error) {
      throw error;
    }
  }
}
