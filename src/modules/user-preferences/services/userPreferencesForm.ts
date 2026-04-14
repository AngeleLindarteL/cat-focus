import { z } from "zod";
import {
  DEFAULT_USER_PREFERENCES_FORM_VALUES,
  USER_PREFERENCES_NAME_MIN_LENGTH,
  USER_PREFERENCES_REASON_MAX_LENGTH,
  USER_PREFERENCES_REASON_MIN_LENGTH,
} from "@/modules/user-preferences/services/userPreferencesForm.constants";
import type {
  UserPreferencesFormValues,
  UserPreferencesValidationMessages,
} from "@/modules/user-preferences/services/userPreferencesForm.interfaces";

function normalizeText(value: string): string {
  return value.trim().replace(/\s+/g, " ");
}

export function createUserPreferencesFormSchema(
  messages: UserPreferencesValidationMessages,
) {
  return z.object({
    userName: z
      .string()
      .transform(normalizeText)
      .refine((value) => value.length > 0, messages.nameRequired)
      .refine(
        (value) => value.length >= USER_PREFERENCES_NAME_MIN_LENGTH,
        messages.nameMinLength,
      ),
    installationReason: z
      .string()
      .transform(normalizeText)
      .refine((value) => value.length > 0, messages.reasonRequired)
      .refine(
        (value) => value.length >= USER_PREFERENCES_REASON_MIN_LENGTH,
        messages.reasonMinLength,
      )
      .refine(
        (value) => value.length <= USER_PREFERENCES_REASON_MAX_LENGTH,
        messages.reasonMaxLength,
      ),
  });
}

export function createUserPreferencesFormDefaultValues(
  values?: Partial<UserPreferencesFormValues> | null,
): UserPreferencesFormValues {
  return {
    userName: values?.userName ?? DEFAULT_USER_PREFERENCES_FORM_VALUES.userName,
    installationReason:
      values?.installationReason
      ?? DEFAULT_USER_PREFERENCES_FORM_VALUES.installationReason,
  };
}

export function normalizeUserPreferencesFormValues(
  values: UserPreferencesFormValues,
): UserPreferencesFormValues {
  return {
    userName: normalizeText(values.userName),
    installationReason: normalizeText(values.installationReason),
  };
}

export type { UserPreferencesFormValues } from "@/modules/user-preferences/services/userPreferencesForm.interfaces";

