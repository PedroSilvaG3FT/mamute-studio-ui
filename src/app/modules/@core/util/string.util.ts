export class StringUtil {
  public static generateTicketNumber(maxLength: number = 5): string {
    const characters = `0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz`;
    let randomString = '';

    for (let i = 0; i < maxLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
    }

    return randomString.toUpperCase();
  }
}
