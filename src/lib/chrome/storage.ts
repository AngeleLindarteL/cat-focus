type ChromeStorageValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | ChromeStorageValue[]
  | { [key: string]: ChromeStorageValue };

type StorageRecord = Record<string, ChromeStorageValue>;

function getLocalStorageArea() {
  if (typeof chrome === "undefined" || !chrome.storage?.local) {
    throw new Error("chrome.storage.local is not available");
  }

  return chrome.storage.local;
}

export async function getLocalStorageValues<T extends StorageRecord>(
  keys: string[],
): Promise<Partial<T>> {
  const storageArea = getLocalStorageArea();

  return storageArea.get(keys) as Promise<Partial<T>>;
}

export async function setLocalStorageValues(values: StorageRecord): Promise<void> {
  const storageArea = getLocalStorageArea();

  await storageArea.set(values);
}
