import { HomeView } from "@/modules/home/views/HomeView";
import type { PopupOnboardingRedirectViewProps } from "@/modules/onboarding/views/PopupOnboardingRedirectView/interfaces";

export function PopupOnboardingRedirectView({
  getTranslation,
  isLoading = false,
  onPrimaryAction,
}: PopupOnboardingRedirectViewProps) {
  return (
    <HomeView
      variant={isLoading ? "popup-redirect-loading" : "popup-redirect"}
      getTranslation={getTranslation}
      onPrimaryAction={onPrimaryAction}
    />
  );
}
