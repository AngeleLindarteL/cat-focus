export function openExtensionOptions(): Promise<void> {
  return chrome.runtime.openOptionsPage();
}
