import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { catToast } from "@/components/Toast";
import { TranslationKey, type UseTranslationResult } from "@/lib/i18n";
import {
  userPreferencesRepository as defaultUserPreferencesRepository,
  type UserPreferencesRepository,
} from "@/lib/repositories";
import {
  createUserPreferencesFormDefaultValues,
  createUserPreferencesFormSchema,
  normalizeUserPreferencesFormValues,
  type UserPreferencesFormValues,
} from "@/modules/user-preferences/services/userPreferencesForm";
import { UserPreferencesFormView } from "@/modules/user-preferences/views/UserPreferencesFormView";

type UserPreferencesFormContainerProps = {
  mode: "creation" | "edition";
  getTranslation: UseTranslationResult["getTranslation"];
  repository?: UserPreferencesRepository;
  initialValues?: Partial<UserPreferencesFormValues> | null;
  onSubmitted?: (values: UserPreferencesFormValues) => Promise<void> | void;
  onPreviousAction?: () => void;
  previousActionLabel?: string;
};

export function UserPreferencesFormContainer({
  mode,
  getTranslation,
  repository = defaultUserPreferencesRepository,
  initialValues,
  onSubmitted,
  onPreviousAction,
  previousActionLabel,
}: UserPreferencesFormContainerProps) {
  const schema = useMemo(
    () =>
      createUserPreferencesFormSchema({
        nameRequired: getTranslation(
          TranslationKey.ValidationUserPreferencesNameRequired,
        ),
        nameMinLength: getTranslation(
          TranslationKey.ValidationUserPreferencesNameMinLength,
        ),
        reasonRequired: getTranslation(
          TranslationKey.ValidationUserPreferencesReasonRequired,
        ),
        reasonMinLength: getTranslation(
          TranslationKey.ValidationUserPreferencesReasonMinLength,
        ),
        reasonMaxLength: getTranslation(
          TranslationKey.ValidationUserPreferencesReasonMaxLength,
        ),
      }),
    [getTranslation],
  );
  const form = useForm<UserPreferencesFormValues>({
    resolver: zodResolver(schema),
    defaultValues: createUserPreferencesFormDefaultValues(initialValues),
    mode: "onSubmit",
  });

  useEffect(() => {
    form.reset(createUserPreferencesFormDefaultValues(initialValues));
  }, [form, initialValues]);

  async function handleSubmit(values: UserPreferencesFormValues) {
    try {
      const normalizedValues = normalizeUserPreferencesFormValues(values);

      await repository.updatePreferences(normalizedValues);

      if (onSubmitted) {
        await onSubmitted(normalizedValues);
      }

      if (mode === "edition") {
        form.reset(normalizedValues);
        catToast.success(getTranslation(TranslationKey.ToastPreferencesSaved));
      }
    } catch {
      catToast.error(getTranslation(TranslationKey.ToastSaveError));
    }
  }

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <UserPreferencesFormView
        getTranslation={getTranslation}
        register={form.register}
        errors={form.formState.errors}
        isSubmitting={form.formState.isSubmitting}
        isDirty={form.formState.isDirty}
        mode={mode === "creation" ? "onboarding" : "dashboard"}
        submitLabel={getTranslation(
          mode === "creation"
            ? TranslationKey.UserPreferencesCreateSubmit
            : TranslationKey.UserPreferencesUpdateSubmit,
        )}
        onPreviousAction={onPreviousAction}
        previousActionLabel={previousActionLabel}
      />
    </form>
  );
}
