export class ExtensionHelpers {
  private constructor() {}

  static getExtensionAssetUrl(path: string): string {
    if (typeof chrome !== "undefined" && chrome.runtime?.getURL) {
      return chrome.runtime.getURL(path);
    }

    return new URL(`../../../${path}`, import.meta.url).href;
  }
}
