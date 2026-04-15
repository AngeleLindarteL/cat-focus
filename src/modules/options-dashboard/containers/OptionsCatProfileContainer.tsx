import { useEffect, useState } from "react";
import { TranslationKey, type UseTranslationResult } from "@/lib/i18n";
import {
  catRepository as defaultCatRepository,
  type CatRepository,
} from "@/lib/repositories/catRepository";
import { useCatProfileForm } from "@/modules/onboarding/hooks/useCatProfileForm";
import type { CatProfileFormValues } from "@/modules/onboarding/types/onboardingView";
import { OnboardingStepOneView } from "@/modules/onboarding/views/OnboardingStepOneView";

type OptionsCatProfileContainerProps = {
  getTranslation: UseTranslationResult["getTranslation"];
  catRepository?: CatRepository;
};

export function OptionsCatProfileContainer({
  getTranslation,
  catRepository = defaultCatRepository,
}: OptionsCatProfileContainerProps) {
  const [initialValues, setInitialValues] = useState<
    Awaited<ReturnType<CatRepository["getCatProfile"]>>
  >(null);
  const [isLoading, setIsLoading] = useState(true);
  const form = useCatProfileForm(initialValues, getTranslation);

  useEffect(() => {
    let isMounted = true;

    void catRepository.getCatProfile().then((storedProfile) => {
      if (!isMounted) {
        return;
      }

      setInitialValues(storedProfile);
      setIsLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, [catRepository]);

  async function handleSubmit(values: CatProfileFormValues) {
    await catRepository.saveCatProfile(values);
    setInitialValues(values);
  }

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-600">
        {getTranslation(TranslationKey.LoadingLabel)}
      </div>
    );
  }

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <OnboardingStepOneView
        getTranslation={getTranslation}
        register={form.register}
        errors={form.formState.errors}
        catName={form.name}
        furColorPrimary={form.furColorPrimary}
        furColorSecondary={form.furColorSecondary}
        eyeColor={form.eyeColor}
        tailColor={form.tailColor}
        submitLabelKey={TranslationKey.CatUpdateSubmit}
      />
    </form>
  );
}
