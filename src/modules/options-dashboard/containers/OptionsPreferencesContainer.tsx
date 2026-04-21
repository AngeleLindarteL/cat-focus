import { useEffect, useState } from "react";
import { TranslationKey, type UseTranslationResult } from "@/lib/i18n";
import {
  userPreferencesRepository as defaultUserPreferencesRepository,
  type UserPreferencesRepository,
} from "@/lib/repositories";
import { UserPreferencesFormContainer } from "@/modules/user-preferences";
import type { UserPreferencesFormValues } from "@/modules/user-preferences/services/userPreferencesForm";

type OptionsPreferencesContainerProps = {
  getTranslation: UseTranslationResult["getTranslation"];
  repository?: UserPreferencesRepository;
};

export function OptionsPreferencesContainer({
  getTranslation,
  repository = defaultUserPreferencesRepository,
}: OptionsPreferencesContainerProps) {
  const [initialValues, setInitialValues] = useState<
    Partial<UserPreferencesFormValues> | null
  >(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    void repository.getPreferences().then((storedPreferences) => {
      if (!isMounted) {
        return;
      }

      setInitialValues({
        userName: storedPreferences?.userName,
        installationReason: storedPreferences?.installationReason,
      });
      setIsLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, [repository]);

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-600">
        {getTranslation(TranslationKey.LoadingLabel)}
      </div>
    );
  }

  return (
    <UserPreferencesFormContainer
      mode="edition"
      getTranslation={getTranslation}
      repository={repository}
      initialValues={initialValues}
      onSubmitted={(values) => {
        setInitialValues(values);
      }}
    />
  );
}
