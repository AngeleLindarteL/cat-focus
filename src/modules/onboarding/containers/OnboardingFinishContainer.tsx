import { useEffect, useState } from "react";
import type { UseTranslationResult } from "@/lib/i18n";
import type { LegacyCatProfile } from "@/lib/onboarding";
import {
  catRepository as defaultCatRepository,
  type CatRepository,
} from "@/lib/repositories";
import { OnboardingFinishView } from "@/modules/onboarding/views/OnboardingFinishView";

type OnboardingFinishContainerProps = {
  getTranslation: UseTranslationResult["getTranslation"];
  onPrimaryAction: () => void;
  catRepository?: CatRepository;
};

export function OnboardingFinishContainer({
  getTranslation,
  onPrimaryAction,
  catRepository = defaultCatRepository,
}: OnboardingFinishContainerProps) {
  const [catProfile, setCatProfile] = useState<LegacyCatProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    void catRepository.getCatProfile().then((storedProfile) => {
      if (!isMounted) {
        return;
      }

      setCatProfile(storedProfile);
      setIsLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, [catRepository]);

  return (
    <OnboardingFinishView
      getTranslation={getTranslation}
      catProfile={catProfile}
      isLoading={isLoading}
      onPrimaryAction={onPrimaryAction}
    />
  );
}
