export interface SupabaseStorageSeachSortBy {
  column?: string;
  order?: string;
}

export interface ISupabaseStorageSeachOptions {
  limit?: number;
  offset?: number;
  search?: string;
  sortBy?: SupabaseStorageSeachSortBy;
}

export interface ISupabaseStorageUploadResponse {
  id: string;
  path: string;
  fullPath: string;
}

export interface ISupabaseStorageUploadOptions {
  cacheControl?: string;
  contentType?: string;
  upsert?: boolean;
  duplex?: string;
}

export interface ISupabaseStorageFileMetadata {
  eTag: string;
  size: number;
  mimetype: string;
  cacheControl: string;
  lastModified: string;
  contentLength: number;
  httpStatusCode: number;
}

export interface ISupabaseStorageFile {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  last_accessed_at: string;
}
