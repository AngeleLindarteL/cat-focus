import { USER_PREFERENCES_STORAGE_KEY } from "@/lib/repositories/userPreferencesRepository.constants";
import type { Language } from "@/lib/i18n";

export type UserPreferences = {
  language?: Language;
  userName?: string;
  installationReason?: string;
};

export type UserPreferencesStorageShape = {
  [USER_PREFERENCES_STORAGE_KEY]?: UserPreferences | null;
};

export interface UserPreferencesRepository {
  getPreferences(): Promise<UserPreferences | null>;
  savePreferences(preferences: UserPreferences): Promise<void>;
  updatePreferences(patch: Partial<UserPreferences>): Promise<UserPreferences>;
}
