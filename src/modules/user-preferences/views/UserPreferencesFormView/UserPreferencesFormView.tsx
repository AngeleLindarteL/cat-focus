import { TranslationKey } from "@/lib/i18n";
import type { UserPreferencesFormViewProps } from "@/modules/user-preferences/views/UserPreferencesFormView/interfaces";

export function UserPreferencesFormView({
  getTranslation,
  register,
  errors,
  submitLabel,
  isSubmitting = false,
  onPreviousAction,
  previousActionLabel,
}: UserPreferencesFormViewProps) {
  return (
    <div className="space-y-5 rounded-2xl bg-stone-100 p-5">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold tracking-tight text-stone-900">
          {getTranslation(TranslationKey.OnboardingStepThreeTitle)}
        </h2>
        <p className="text-sm leading-6 text-stone-600">
          {getTranslation(TranslationKey.OnboardingStepThreeDescription)}
        </p>
      </div>

      <label className="block space-y-2">
        <span className="text-sm font-medium text-stone-800">
          {getTranslation(TranslationKey.UserPreferencesNameLabel)}
        </span>
        <input
          {...register("userName")}
          type="text"
          placeholder={getTranslation(TranslationKey.UserPreferencesNamePlaceholder)}
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
          placeholder={getTranslation(TranslationKey.UserPreferencesReasonPlaceholder)}
          rows={5}
          className="w-full resize-y rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-amber-500"
        />
        {errors.installationReason ? (
          <p className="text-sm text-red-700">{errors.installationReason.message}</p>
        ) : null}
      </label>

      <div className="flex gap-3">
        {onPreviousAction && previousActionLabel ? (
          <button
            type="button"
            onClick={onPreviousAction}
            disabled={isSubmitting}
            className="inline-flex flex-1 cursor-pointer items-center justify-center rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm font-medium text-stone-700 transition hover:bg-stone-50 disabled:cursor-not-allowed"
          >
            {previousActionLabel}
          </button>
        ) : null}
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex flex-1 cursor-pointer items-center justify-center rounded-2xl bg-stone-900 px-4 py-3 text-sm font-medium text-stone-50 transition hover:bg-stone-700 disabled:cursor-not-allowed disabled:bg-stone-300"
        >
          {submitLabel}
        </button>
      </div>
    </div>
  );
}

