import type { CatProfile } from "@/lib/cat";
import { NEW_CAT_REPOSITORY_STORAGE_KEY } from "./newCatRepository.constants";

export type NewCatStorageShape = {
  [NEW_CAT_REPOSITORY_STORAGE_KEY]?: CatProfile | null;
};

export interface NewCatRepository {
  getNewCatProfile(): Promise<CatProfile | null>;
  saveNewCatProfile(profile: CatProfile): Promise<void>;
}
