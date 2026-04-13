import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { CatProfileFormValues } from "@/modules/onboarding/types/onboardingView";

export type OnboardingStepOneViewProps = {
  register: UseFormRegister<CatProfileFormValues>;
  errors: FieldErrors<CatProfileFormValues>;
  furColorPrimary: string;
  furColorSecondary: string;
  title: string;
  description: string;
  nameLabel: string;
  namePlaceholder: string;
  primaryColorLabel: string;
  secondaryColorLabel: string;
  previewLabel: string;
  submitLabel: string;
};
