export const FIREBASE_STORAGE_ERROR = {
  objectNotFound: {
    key: 'storage/object-not-found',
    message: `File doesn't exist`,
  },
  unauthorized: {
    key: 'storage/unauthorized',
    message: `User doesn't have permission to access the object`,
  },
  canceled: {
    key: 'storage/canceled',
    message: `User canceled the upload`,
  },
};

export const FIREBASE_STORAGE_ERROR_LIST = Object.entries(
  FIREBASE_STORAGE_ERROR
).map(([, value]) => value);
