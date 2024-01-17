import { generateUUID } from '../functions/uuid.function';

export class DownloadUtil {
  private static handlerElement(
    content: string | Blob,
    fileName: string,
    preventClick: boolean = false
  ): HTMLAnchorElement {
    const anchor = document.createElement('a');
    anchor.href = content as string;
    anchor.setAttribute('download', fileName);

    if (!preventClick) anchor.click();

    return anchor;
  }

  static blob(blob: Blob, fileName: string) {
    const blobUrl = URL.createObjectURL(blob);
    this.handlerElement(blobUrl, fileName);
  }

  static async stringBlobToFile(blobUrl: string) {
    const response = await fetch(blobUrl);
    const blob = await response.blob();

    return new File([blob], generateUUID(), { type: blob.type });
  }

  static processBlobByUrl(url: string, fileName: string) {
    const xhr = new XMLHttpRequest();

    xhr.responseType = 'blob';
    xhr.onload = () => {
      this.blob(xhr.response as Blob, fileName);
    };
    xhr.open('GET', url);
    xhr.send();
  }
}
