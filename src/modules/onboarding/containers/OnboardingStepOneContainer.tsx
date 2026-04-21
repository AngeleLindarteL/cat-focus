import type { CatRepository } from "@/lib/repositories";
import type { UseTranslationResult } from "@/lib/i18n";
import type { OnboardingRepository } from "@/lib/repositories";
import { useCatProfileForm } from "@/modules/onboarding/hooks/useCatProfileForm";
import type { CatProfileFormValues } from "@/modules/onboarding/types/onboardingView";
import { OnboardingStepOneView } from "@/modules/onboarding/views/OnboardingStepOneView";

type OnboardingStepOneContainerProps = {
  catRepository: CatRepository;
  onboardingRepository: OnboardingRepository;
  initialValues: Awaited<ReturnType<CatRepository["getCatProfile"]>>;
  onSubmitted: () => Promise<void>;
  getTranslation: UseTranslationResult["getTranslation"];
};

export function OnboardingStepOneContainer({
  catRepository,
  onboardingRepository,
  initialValues,
  onSubmitted,
  getTranslation,
}: OnboardingStepOneContainerProps) {
  const form = useCatProfileForm(initialValues, getTranslation);

  async function handleSubmit(values: CatProfileFormValues) {
    await catRepository.saveCatProfile(values);
    await onboardingRepository.setActiveStep(2);
    await onSubmitted();
  }

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <OnboardingStepOneView
        getTranslation={getTranslation}
        register={form.register}
        errors={form.formState.errors}
        catName={form.name}
        furColorPrimary={form.furColorPrimary}
        furColorSecondary={form.furColorSecondary}
        eyeColor={form.eyeColor}
        tailColor={form.tailColor}
      />
    </form>
  );
}
