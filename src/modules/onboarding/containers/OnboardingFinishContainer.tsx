import { useEffect, useState } from "react";
import type { UseTranslationResult } from "@/lib/i18n";
import type { CatProfile } from "@/lib/onboarding";
import {
  catRepository as defaultCatRepository,
  type CatRepository,
} from "@/lib/repositories/catRepository";
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
  const [catProfile, setCatProfile] = useState<CatProfile | null>(null);
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

