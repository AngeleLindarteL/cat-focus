import { openExtensionOptions } from "@/lib/chrome/extension";
import { Toaster } from "@/components/Toast";
import { useTranslation } from "@/lib/i18n";
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
  const { isLoading, onboardingState } =
    useOnboardingState(onboardingRepository);

  if (isLoading || !onboardingState) {
    return (
      <PopupOnboardingRedirectView
        getTranslation={getTranslation}
        isLoading
        onPrimaryAction={() => {
          void openExtensionOptions();
        }}
      />
    );
  }

  if (!onboardingState.finished) {
    return (
      <PopupOnboardingRedirectView
        getTranslation={getTranslation}
        onPrimaryAction={() => {
          void openExtensionOptions();
        }}
      />
    );
  }

  return (
    <>
      <Toaster position="bottom-center" />
      <PopupHomeContainer getTranslation={getTranslation} />
    </>
  );
}
