import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import type { CatProfile } from "@/lib/onboarding";
import { TranslationKey, type UseTranslationResult } from "@/lib/i18n";
import { createCatProfileSchema } from "@/modules/onboarding/services/catProfileForm";
import type { CatProfileFormValues } from "@/modules/onboarding/types/onboardingView";
import { DEFAULT_CAT_PROFILE } from "@/modules/onboarding/hooks/useCatProfileForm.constants";

export function useCatProfileForm(
  initialValues: CatProfile | null,
  getTranslation: UseTranslationResult["getTranslation"],
) {
  const schema = useMemo(
    () =>
      createCatProfileSchema({
        nameRequired: getTranslation(TranslationKey.ValidationCatNameRequired),
        nameMinLength: getTranslation(TranslationKey.ValidationCatNameMinLength),
        nameMaxLength: getTranslation(TranslationKey.ValidationCatNameMaxLength),
        colorInvalid: getTranslation(TranslationKey.ValidationColorInvalid),
      }),
    [getTranslation],
  );

  const form = useForm<CatProfileFormValues>({
    resolver: zodResolver(schema),
    defaultValues: initialValues ?? DEFAULT_CAT_PROFILE,
    mode: "onSubmit",
  });

  useEffect(() => {
    form.reset(initialValues ?? DEFAULT_CAT_PROFILE);
  }, [form, initialValues]);

  const furColorPrimary = useWatch({
    control: form.control,
    name: "furColorPrimary",
    defaultValue: initialValues?.furColorPrimary ?? DEFAULT_CAT_PROFILE.furColorPrimary,
  });
  const furColorSecondary = useWatch({
    control: form.control,
    name: "furColorSecondary",
    defaultValue:
      initialValues?.furColorSecondary ?? DEFAULT_CAT_PROFILE.furColorSecondary,
  });
  const eyeColor = useWatch({
    control: form.control,
    name: "eyeColor",
    defaultValue: initialValues?.eyeColor ?? DEFAULT_CAT_PROFILE.eyeColor,
  });
  const tailColor = useWatch({
    control: form.control,
    name: "tailColor",
    defaultValue: initialValues?.tailColor ?? DEFAULT_CAT_PROFILE.tailColor,
  });

  return {
    ...form,
    furColorPrimary,
    furColorSecondary,
    eyeColor,
    tailColor,
  };
}
