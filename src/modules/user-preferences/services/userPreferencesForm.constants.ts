import type { UserPreferencesFormValues } from "@/modules/user-preferences/services/userPreferencesForm.interfaces";

export const USER_PREFERENCES_NAME_MIN_LENGTH = 3;
export const USER_PREFERENCES_REASON_MIN_LENGTH = 3;
export const USER_PREFERENCES_REASON_MAX_LENGTH = 1000;

export const DEFAULT_USER_PREFERENCES_FORM_VALUES: UserPreferencesFormValues = {
  userName: "",
  installationReason: "",
};

