import { openExtensionOptions } from "@/lib/chrome/extension";
import { messages } from "@/lib/i18n/messages";
import { HomeView } from "@/modules/home/views/HomeView";

export function PopupHomeContainer() {
  return (
    <HomeView
      eyebrow={messages.popupEyebrow()}
      title={messages.homePopupTitle()}
      description={messages.homePopupDescription()}
      body={messages.homePopupBody()}
      primaryActionLabel={messages.homePopupAction()}
      onPrimaryAction={() => {
        void openExtensionOptions();
      }}
      secondaryText={messages.homePopupFooter()}
    />
  );
}
