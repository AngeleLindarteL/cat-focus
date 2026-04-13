import { messages } from "@/lib/i18n/messages";
import { HomeView } from "@/modules/home/views/HomeView";

export function OptionsHomeContainer() {
  return (
    <HomeView
      eyebrow={messages.optionsEyebrow()}
      title={messages.homeOptionsTitle()}
      description={messages.homeOptionsDescription()}
      body={messages.homeOptionsBody()}
      secondaryText={messages.homeOptionsFooter()}
    />
  );
}
