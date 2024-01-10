import { Injectable } from '@angular/core';
import { SupabaseBucketService } from './supabase-bucket.service';

@Injectable({ providedIn: 'root' })
export class SupabaseStorageService {
  constructor(public _bucketService: SupabaseBucketService) {
    this._bucketService.bucketName = '';
  }

  public download(path: string) {
    // return this.supabase.storage.from('avatars').download(path);
  }

  public upload(filePath: string, file: File) {
    // return this.supabase.storage.from('avatars').upload(filePath, file);
  }
}
