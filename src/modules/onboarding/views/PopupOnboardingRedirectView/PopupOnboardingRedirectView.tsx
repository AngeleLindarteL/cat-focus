import { HomeView } from "@/modules/home/views/HomeView";
import type { PopupOnboardingRedirectViewProps } from "@/modules/onboarding/views/PopupOnboardingRedirectView/interfaces";

export function PopupOnboardingRedirectView({
  eyebrow,
  title,
  description,
  body,
  primaryActionLabel,
  secondaryText,
  onPrimaryAction,
}: PopupOnboardingRedirectViewProps) {
  return (
    <HomeView
      surface="popup"
      eyebrow={eyebrow}
      title={title}
      description={description}
      body={body}
      primaryActionLabel={primaryActionLabel}
      onPrimaryAction={onPrimaryAction}
      secondaryText={secondaryText}
    />
  );
}
