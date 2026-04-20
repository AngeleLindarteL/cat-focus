import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { TranslationKey, UseTranslationResult } from "@/lib/i18n";
import type { CatProfileFormValues } from "@/modules/onboarding/types/onboardingView";

export type CatProfileDashboardViewProps = {
  getTranslation: UseTranslationResult["getTranslation"];
  register: UseFormRegister<CatProfileFormValues>;
  errors: FieldErrors<CatProfileFormValues>;
  catName: string;
  furColorPrimary: string;
  furColorSecondary: string;
  eyeColor: string;
  tailColor: string;
  isDirty: boolean;
  isSubmitting: boolean;
  submitLabelKey: TranslationKey;
};
