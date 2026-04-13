export function getMessage(
  key: string,
  substitutions?: string | string[],
): string {
  if (typeof chrome === "undefined" || !chrome.i18n?.getMessage) {
    return key;
  }

  return chrome.i18n.getMessage(key, substitutions) || key;
}

export function getUILanguage(): string | null {
  if (typeof chrome === "undefined" || !chrome.i18n?.getUILanguage) {
    return null;
  }

  return chrome.i18n.getUILanguage();
}
