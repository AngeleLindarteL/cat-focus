import type { UseTranslationResult } from "@/lib/i18n";
import { HomeView } from "@/modules/home/views/HomeView";

type OptionsHomeContainerProps = {
  getTranslation: UseTranslationResult["getTranslation"];
};

export function OptionsHomeContainer({
  getTranslation,
}: OptionsHomeContainerProps) {
  return (
    <HomeView
      variant="options-home"
      getTranslation={getTranslation}
    />
  );
}
