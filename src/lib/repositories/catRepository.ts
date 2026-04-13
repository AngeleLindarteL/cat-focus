import {
  getLocalStorageValues,
  setLocalStorageValues,
} from "@/lib/chrome/storage";
import { ONBOARDING_STORAGE_KEYS, type CatProfile } from "@/lib/onboarding";
import { CAT_REPOSITORY_STORAGE_KEYS } from "@/lib/repositories/catRepository.constants";
import type {
  CatRepository,
  CatStorageShape,
} from "@/lib/repositories/catRepository.interfaces";

export class ChromeStorageCatRepository implements CatRepository {
  async getCatProfile(): Promise<CatProfile | null> {
    const values = await getLocalStorageValues<CatStorageShape>(
      CAT_REPOSITORY_STORAGE_KEYS,
    );

    return values[ONBOARDING_STORAGE_KEYS.catProfile] ?? null;
  }

  async saveCatProfile(profile: CatProfile): Promise<void> {
    await setLocalStorageValues({
      [ONBOARDING_STORAGE_KEYS.catProfile]: profile,
    });
  }
}

export const catRepository: CatRepository = new ChromeStorageCatRepository();

export type { CatRepository, CatStorageShape } from "@/lib/repositories/catRepository.interfaces";
