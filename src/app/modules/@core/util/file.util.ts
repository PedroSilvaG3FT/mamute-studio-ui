export class FileUtil {
  public static jsonToBlob<Data>(model: Data) {
    const jsonString = JSON.stringify(model);
    const blob = new Blob([jsonString], { type: 'application/json' });
    return URL.createObjectURL(blob);
  }
}
