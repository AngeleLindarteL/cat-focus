import { openExtensionOptions } from "@/lib/chrome/extension";
import { TranslationKey, useTranslation } from "@/lib/i18n";
import {
  onboardingRepository as defaultOnboardingRepository,
  type OnboardingRepository,
} from "@/lib/repositories/onboardingRepository";
import { PopupHomeContainer } from "@/modules/home/containers/PopupHomeContainer";
import { useOnboardingState } from "@/modules/onboarding/hooks/useOnboardingState";
import { PopupOnboardingRedirectView } from "@/modules/onboarding/views/PopupOnboardingRedirectView";

type PopupGateContainerProps = {
  onboardingRepository?: OnboardingRepository;
};

export function PopupGateContainer({
  onboardingRepository = defaultOnboardingRepository,
}: PopupGateContainerProps) {
  const { getTranslation } = useTranslation();
  const { isLoading, onboardingState } = useOnboardingState(onboardingRepository);

  if (isLoading || !onboardingState) {
    return (
      <PopupOnboardingRedirectView
        eyebrow={getTranslation(TranslationKey.PopupEyebrow)}
        title={getTranslation(TranslationKey.PopupRedirectTitle)}
        description={getTranslation(TranslationKey.PopupRedirectDescription)}
        body={getTranslation(TranslationKey.LoadingLabel)}
        primaryActionLabel={getTranslation(TranslationKey.PopupRedirectAction)}
        secondaryText={getTranslation(TranslationKey.PopupRedirectFooter)}
        onPrimaryAction={() => {
          void openExtensionOptions();
        }}
      />
    );
  }

  if (!onboardingState.finished) {
    return (
      <PopupOnboardingRedirectView
        eyebrow={getTranslation(TranslationKey.PopupEyebrow)}
        title={getTranslation(TranslationKey.PopupRedirectTitle)}
        description={getTranslation(TranslationKey.PopupRedirectDescription)}
        body={getTranslation(TranslationKey.PopupRedirectBody)}
        primaryActionLabel={getTranslation(TranslationKey.PopupRedirectAction)}
        secondaryText={getTranslation(TranslationKey.PopupRedirectFooter)}
        onPrimaryAction={() => {
          void openExtensionOptions();
        }}
      />
    );
  }

  return <PopupHomeContainer getTranslation={getTranslation} />;
}
