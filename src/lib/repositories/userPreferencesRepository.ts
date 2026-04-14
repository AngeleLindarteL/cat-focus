import {
  getLocalStorageValues,
  setLocalStorageValues,
} from "@/lib/chrome/storage";
import { USER_PREFERENCES_STORAGE_KEY } from "@/lib/repositories/userPreferencesRepository.constants";
import type {
  UserPreferences,
  UserPreferencesRepository,
  UserPreferencesStorageShape,
} from "@/lib/repositories/userPreferencesRepository.interfaces";

export class ChromeStorageUserPreferencesRepository
  implements UserPreferencesRepository
{
  async getPreferences(): Promise<UserPreferences | null> {
    const values = await getLocalStorageValues<UserPreferencesStorageShape>([
      USER_PREFERENCES_STORAGE_KEY,
    ]);

    return values[USER_PREFERENCES_STORAGE_KEY] ?? null;
  }

  async savePreferences(preferences: UserPreferences): Promise<void> {
    await setLocalStorageValues({
      [USER_PREFERENCES_STORAGE_KEY]: preferences,
    });
  }

  async updatePreferences(
    patch: Partial<UserPreferences>,
  ): Promise<UserPreferences> {
    const currentPreferences = (await this.getPreferences()) ?? {};
    const nextPreferences = {
      ...currentPreferences,
      ...patch,
    };

    await this.savePreferences(nextPreferences);

    return nextPreferences;
  }
}

export const userPreferencesRepository: UserPreferencesRepository =
  new ChromeStorageUserPreferencesRepository();

export type {
  UserPreferences,
  UserPreferencesRepository,
  UserPreferencesStorageShape,
} from "@/lib/repositories/userPreferencesRepository.interfaces";
