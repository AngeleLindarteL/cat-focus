import { openExtensionOptions } from "@/lib/chrome/extension";
import { messages } from "@/lib/i18n/messages";
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
  const { isLoading, onboardingState } = useOnboardingState(onboardingRepository);

  if (isLoading || !onboardingState) {
    return (
      <PopupOnboardingRedirectView
        eyebrow={messages.popupEyebrow()}
        title={messages.popupRedirectTitle()}
        description={messages.popupRedirectDescription()}
        body={messages.loadingLabel()}
        primaryActionLabel={messages.popupRedirectAction()}
        secondaryText={messages.popupRedirectFooter()}
        onPrimaryAction={() => {
          void openExtensionOptions();
        }}
      />
    );
  }

  if (!onboardingState.finished) {
    return (
      <PopupOnboardingRedirectView
        eyebrow={messages.popupEyebrow()}
        title={messages.popupRedirectTitle()}
        description={messages.popupRedirectDescription()}
        body={messages.popupRedirectBody()}
        primaryActionLabel={messages.popupRedirectAction()}
        secondaryText={messages.popupRedirectFooter()}
        onPrimaryAction={() => {
          void openExtensionOptions();
        }}
      />
    );
  }

  return <PopupHomeContainer />;
}
