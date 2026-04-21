import { ONBOARDING_STORAGE_KEYS } from "@/lib/onboarding";
import type { LegacyCatProfile } from "@/lib/onboarding";

export type CatStorageShape = {
  [ONBOARDING_STORAGE_KEYS.catProfile]?: LegacyCatProfile | null;
};

export interface CatRepository {
  getCatProfile(): Promise<LegacyCatProfile | null>;
  saveCatProfile(profile: LegacyCatProfile): Promise<void>;
}
