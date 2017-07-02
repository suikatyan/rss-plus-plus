export default class UrlResolver {
  static resolve(path: string): string {
    return chrome.extension.getURL(path);
  }
}
