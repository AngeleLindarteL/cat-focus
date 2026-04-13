import { USER_PREFERENCES_STORAGE_KEY } from "@/lib/repositories/userPreferencesRepository.constants";
import type { Language } from "@/lib/i18n";

export type UserPreferences = {
  language: Language;
};

export type UserPreferencesStorageShape = {
  [USER_PREFERENCES_STORAGE_KEY]?: UserPreferences | null;
};

export interface UserPreferencesRepository {
  getPreferences(): Promise<UserPreferences | null>;
  savePreferences(preferences: UserPreferences): Promise<void>;
}
