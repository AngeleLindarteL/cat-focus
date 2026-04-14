import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { UseTranslationResult } from "@/lib/i18n";
import type { UserPreferencesFormValues } from "@/modules/user-preferences/services/userPreferencesForm";

export type UserPreferencesFormViewProps = {
  getTranslation: UseTranslationResult["getTranslation"];
  register: UseFormRegister<UserPreferencesFormValues>;
  errors: FieldErrors<UserPreferencesFormValues>;
  submitLabel: string;
  isSubmitting?: boolean;
  onPreviousAction?: () => void;
  previousActionLabel?: string;
};

