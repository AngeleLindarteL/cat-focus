import { useEffect, useState } from "react";
import { catToast } from "@/components/Toast";
import { TranslationKey, type UseTranslationResult } from "@/lib/i18n";
import {
  catRepository as defaultCatRepository,
  type CatRepository,
} from "@/lib/repositories";
import { useCatProfileForm } from "@/modules/onboarding/hooks/useCatProfileForm";
import type { CatProfileFormValues } from "@/modules/onboarding/types/onboardingView";
import { CatProfileDashboardView } from "@/modules/options-dashboard/views/CatProfileDashboardView";

type OptionsCatProfileContainerProps = {
  getTranslation: UseTranslationResult["getTranslation"];
  catRepository?: CatRepository;
};

export function OptionsCatProfileContainer({
  getTranslation,
  catRepository = defaultCatRepository,
}: OptionsCatProfileContainerProps) {
  const [initialValues, setInitialValues] =
    useState<Awaited<ReturnType<CatRepository["getCatProfile"]>>>(null);
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
    try {
      await catRepository.saveCatProfile(values);
      setInitialValues(values);
      form.reset(values);
      catToast.success(getTranslation(TranslationKey.ToastCatSaved));
    } catch {
      catToast.error(getTranslation(TranslationKey.ToastSaveError));
    }
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
      <CatProfileDashboardView
        getTranslation={getTranslation}
        register={form.register}
        errors={form.formState.errors}
        catName={form.name}
        furColorPrimary={form.furColorPrimary}
        furColorSecondary={form.furColorSecondary}
        eyeColor={form.eyeColor}
        tailColor={form.tailColor}
        isDirty={form.formState.isDirty}
        isSubmitting={form.formState.isSubmitting}
        submitLabelKey={TranslationKey.CatUpdateSubmit}
      />
    </form>
  );
}
