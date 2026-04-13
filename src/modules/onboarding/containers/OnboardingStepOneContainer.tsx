import type { CatRepository } from "@/lib/repositories/catRepository";
import type { OnboardingRepository } from "@/lib/repositories/onboardingRepository";
import { useCatProfileForm } from "@/modules/onboarding/hooks/useCatProfileForm";
import type { CatProfileFormValues } from "@/modules/onboarding/types/onboardingView";
import { OnboardingStepOneView } from "@/modules/onboarding/views/OnboardingStepOneView";
import { messages } from "@/lib/i18n/messages";

type OnboardingStepOneContainerProps = {
  catRepository: CatRepository;
  onboardingRepository: OnboardingRepository;
  initialValues: Awaited<ReturnType<CatRepository["getCatProfile"]>>;
  onSubmitted: () => Promise<void>;
};

export function OnboardingStepOneContainer({
  catRepository,
  onboardingRepository,
  initialValues,
  onSubmitted,
}: OnboardingStepOneContainerProps) {
  const form = useCatProfileForm(initialValues);

  async function handleSubmit(values: CatProfileFormValues) {
    await catRepository.saveCatProfile(values);
    await onboardingRepository.setActiveStep(2);
    await onSubmitted();
  }

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <OnboardingStepOneView
        register={form.register}
        errors={form.formState.errors}
        furColorPrimary={form.furColorPrimary}
        furColorSecondary={form.furColorSecondary}
        title={messages.catSetupTitle()}
        description={messages.catSetupDescription()}
        nameLabel={messages.catNameLabel()}
        namePlaceholder={messages.catNamePlaceholder()}
        primaryColorLabel={messages.catPrimaryColorLabel()}
        secondaryColorLabel={messages.catSecondaryColorLabel()}
        previewLabel={messages.catPreviewLabel()}
        submitLabel={messages.catStepSubmit()}
      />
    </form>
  );
}
