import type { CatProfile } from "@/lib/cat";
import {
  getLocalStorageValues,
  setLocalStorageValues,
} from "@/lib/chrome/storage";
import {
  NEW_CAT_REPOSITORY_STORAGE_KEY,
  NEW_CAT_REPOSITORY_STORAGE_KEYS,
} from "./newCatRepository.constants";
import type {
  NewCatRepository,
  NewCatStorageShape,
} from "./newCatRepository.interfaces";

export class ChromeStorageNewCatRepository implements NewCatRepository {
  async getNewCatProfile(): Promise<CatProfile | null> {
    const values = await getLocalStorageValues<NewCatStorageShape>(
      NEW_CAT_REPOSITORY_STORAGE_KEYS,
    );

    return values[NEW_CAT_REPOSITORY_STORAGE_KEY] ?? null;
  }

  async saveNewCatProfile(profile: CatProfile): Promise<void> {
    await setLocalStorageValues({
      [NEW_CAT_REPOSITORY_STORAGE_KEY]: profile,
    });
  }
}

export const newCatRepository: NewCatRepository =
  new ChromeStorageNewCatRepository();
