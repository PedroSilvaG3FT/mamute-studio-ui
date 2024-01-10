export interface ISupabaseBucketCreateOptions {
  public: boolean;
  allowedMimeTypes?: string[] | null;
  fileSizeLimit?: number | string | null;
}
