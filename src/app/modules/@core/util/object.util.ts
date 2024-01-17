export class ObjectUtil {
  public static clone<Data>(value: Data) {
    return JSON.parse(JSON.stringify(value)) as Data
  }
}
