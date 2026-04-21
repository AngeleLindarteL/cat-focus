import {
  getLocalStorageValues,
  setLocalStorageValues,
} from "@/lib/chrome/storage";
import {
  ONBOARDING_STORAGE_KEYS,
  type LegacyCatProfile,
} from "@/lib/onboarding";
import { CAT_REPOSITORY_STORAGE_KEYS } from "./catRepository.constants";
import type { CatRepository, CatStorageShape } from "./catRepository.interfaces";

export class ChromeStorageCatRepository implements CatRepository {
  async getCatProfile(): Promise<LegacyCatProfile | null> {
    const values = await getLocalStorageValues<CatStorageShape>(
      CAT_REPOSITORY_STORAGE_KEYS,
    );

    return values[ONBOARDING_STORAGE_KEYS.catProfile] ?? null;
  }

  async saveCatProfile(profile: LegacyCatProfile): Promise<void> {
    await setLocalStorageValues({
      [ONBOARDING_STORAGE_KEYS.catProfile]: profile,
    });
  }
}

export const catRepository: CatRepository = new ChromeStorageCatRepository();
