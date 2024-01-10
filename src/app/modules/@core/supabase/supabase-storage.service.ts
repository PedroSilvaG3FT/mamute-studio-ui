import { Injectable } from '@angular/core';
import { generateUUID } from '../functions/uuid.function';
import { DownloadUtil } from '../util/download.util';
import {
  ISupabaseStorageFile,
  ISupabaseStorageSeachOptions,
  ISupabaseStorageUploadOptions,
  ISupabaseStorageUploadResponse,
} from './@interfaces/supabase-storage.interface';
import { SupabaseBucketService } from './supabase-bucket.service';

@Injectable({ providedIn: 'root' })
export class SupabaseStorageService {
  constructor(public _bucketService: SupabaseBucketService) {}

  public async getAll(
    bucketName: string,
    path: string,
    options?: ISupabaseStorageSeachOptions
  ) {
    try {
      const bucket = this._bucketService.getBucket(bucketName);
      const response = await bucket.list(path, options);
      return { ...response, data: response.data as ISupabaseStorageFile[] };
    } catch (error) {
      throw error;
    }
  }

  public async upload(
    bucketName: string,
    path: string,
    file: File,
    options?: ISupabaseStorageUploadOptions
  ) {
    try {
      const extesion = file.type.split('/').pop();
      const fullPath = `${path}/${generateUUID()}.${extesion}`;

      const bucket = this._bucketService.getBucket(bucketName);
      const response = await bucket.upload(fullPath, file, options);

      return {
        ...response,
        data: response.data as ISupabaseStorageUploadResponse,
      };
    } catch (error) {
      throw error;
    }
  }

  public async delete(bucketName: string, paths: string[]) {
    try {
      const bucket = this._bucketService.getBucket(bucketName);
      const response = await bucket.remove(paths);

      return response;
    } catch (error) {
      throw error;
    }
  }

  public async download(bucketName: string, path: string) {
    try {
      const bucket = this._bucketService.getBucket(bucketName);
      const response = await bucket.download(path);

      const splited = path.split('/');
      const name = splited.length ? splited[splited.length - 1] : path;

      DownloadUtil.blob(response.data as Blob, name);
      return { ...response, data: response.data as Blob };
    } catch (error) {
      throw error;
    }
  }

  public async getSignedURL(
    bucketName: string,
    path: string,
    seconds: number = 60
  ) {
    try {
      const bucket = this._bucketService.getBucket(bucketName);
      const response = await bucket.createSignedUrl(path, seconds);
      return response;
    } catch (error) {
      throw error;
    }
  }

  public getPublicURL(bucketName: string, path: string) {
    try {
      const bucket = this._bucketService.getBucket(bucketName);
      return bucket.getPublicUrl(path);
    } catch (error) {
      throw error;
    }
  }

  public async replace(
    bucketName: string,
    path: string,
    file: File,
    options?: ISupabaseStorageUploadOptions
  ) {
    try {
      const bucket = this._bucketService.getBucket(bucketName);
      const response = await bucket.update(path, file, options);
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async copy(bucketName: string, pathFrom: string, pathTo: string) {
    try {
      const bucket = this._bucketService.getBucket(bucketName);
      const response = await bucket.copy(pathFrom, pathTo);
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async move(bucketName: string, pathFrom: string, pathTo: string) {
    try {
      const bucket = this._bucketService.getBucket(bucketName);
      const response = await bucket.move(pathFrom, pathTo);
      return response;
    } catch (error) {
      throw error;
    }
  }
}
