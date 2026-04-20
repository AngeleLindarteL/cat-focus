import { PrimaryButton } from "@/components/PrimaryButton";
import { SecondaryButton } from "@/components/SecondaryButton";
import { TranslationKey } from "@/lib/i18n";
import type { UserPreferencesFormViewProps } from "@/modules/user-preferences/views/UserPreferencesFormView/interfaces";

export function UserPreferencesFormView({
  getTranslation,
  register,
  errors,
  submitLabel,
  isSubmitting = false,
  isDirty = true,
  mode = "onboarding",
  onPreviousAction,
  previousActionLabel,
}: UserPreferencesFormViewProps) {
  return (
    <div className="space-y-5 rounded-2xl bg-stone-100 p-5">
      {mode === "onboarding" ? (
        <div className="space-y-2">
          <h2 className="text-xl font-semibold tracking-tight text-stone-900">
            {getTranslation(TranslationKey.OnboardingStepThreeTitle)}
          </h2>
          <p className="text-sm leading-6 text-stone-600">
            {getTranslation(TranslationKey.OnboardingStepThreeDescription)}
          </p>
        </div>
      ) : null}

      <label className="block space-y-2">
        <span className="text-sm font-medium text-stone-800">
          {getTranslation(TranslationKey.UserPreferencesNameLabel)}
        </span>
        <input
          {...register("userName")}
          type="text"
          placeholder={getTranslation(
            TranslationKey.UserPreferencesNamePlaceholder,
          )}
          className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-amber-500"
        />
        {errors.userName ? (
          <p className="text-sm text-red-700">{errors.userName.message}</p>
        ) : null}
      </label>

      <label className="block space-y-2">
        <span className="text-sm font-medium text-stone-800">
          {getTranslation(TranslationKey.UserPreferencesReasonLabel)}
        </span>
        <textarea
          {...register("installationReason")}
          placeholder={getTranslation(
            TranslationKey.UserPreferencesReasonPlaceholder,
          )}
          rows={5}
          className="w-full resize-y rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-amber-500"
        />
        {errors.installationReason ? (
          <p className="text-sm text-red-700">
            {errors.installationReason.message}
          </p>
        ) : null}
      </label>

      <div className="flex gap-3">
        {onPreviousAction && previousActionLabel ? (
          <SecondaryButton
            type="button"
            text={previousActionLabel}
            disabled={isSubmitting}
            onClick={onPreviousAction}
            className="flex-1"
          />
        ) : null}
        <PrimaryButton
          type="submit"
          text={submitLabel}
          disabled={(mode === "dashboard" && !isDirty) || isSubmitting}
          tooltip={{
            whenDisabled: getTranslation(
              TranslationKey.FormSubmitDisabledNoChanges,
            ),
          }}
          className="flex-1"
        />
      </div>
    </div>
  );
}
