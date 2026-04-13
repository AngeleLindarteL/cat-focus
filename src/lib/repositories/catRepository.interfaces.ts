import { ONBOARDING_STORAGE_KEYS } from "@/lib/onboarding";
import type { CatProfile } from "@/lib/onboarding";

export type CatStorageShape = {
  [ONBOARDING_STORAGE_KEYS.catProfile]?: CatProfile | null;
};

export interface CatRepository {
  getCatProfile(): Promise<CatProfile | null>;
  saveCatProfile(profile: CatProfile): Promise<void>;
}
