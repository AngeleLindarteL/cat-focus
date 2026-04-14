import { PopularSiteCarousel } from "@/components/PopularSiteCarousel";
import { WebsiteListInput } from "@/components/WebsiteListInput";
import { TranslationKey } from "@/lib/i18n";
import { UsageLimitTimeInput } from "@/modules/usage/components/UsageLimitTimeInput";
import type { UsageBlockFormProps } from "@/modules/usage/views/UsageBlockForm/interfaces";

export function UsageBlockForm({
  mode,
  getTranslation,
  showUnsavedReminder = false,
  nameValue,
  nameError,
  onNameChange,
  limitHoursValue,
  limitHoursError,
  onLimitHoursChange,
  limitMinutesValue,
  limitMinutesError,
  onLimitMinutesChange,
  popularSites,
  onPopularSiteSelect,
  sitesValue,
  sitesListError,
  onSitesChange,
  clearSitesListError,
  isSiteEditable,
  onSubmit,
  submitDisabled,
  submitTooltip,
  onDelete,
  onClose,
}: UsageBlockFormProps) {
  const nameLabel = getTranslation(TranslationKey.UsageNameLabel);
  const namePlaceholder = getTranslation(TranslationKey.UsageNamePlaceholder);
  const limitLabel = getTranslation(TranslationKey.UsageLimitLabel);
  const limitHoursLabel = getTranslation(TranslationKey.UsageLimitHoursLabel);
  const limitMinutesLabel = getTranslation(
    TranslationKey.UsageLimitMinutesLabel,
  );
  const sitesLabel = getTranslation(TranslationKey.UsageSitesLabel);
  const siteNameLabel = getTranslation(TranslationKey.ValidationSiteNameRequired);
  const siteNamePlaceholder = getTranslation(
    TranslationKey.UsageSiteNamePlaceholder,
  );
  const siteDomainPlaceholder = getTranslation(
    TranslationKey.UsageSiteDomainPlaceholder,
  );
  const popularSitesTitle = getTranslation(
    TranslationKey.UsagePopularSitesTitle,
  );
  const addSiteLabel = getTranslation(TranslationKey.UsageSiteAdd);
  const editSiteLabel = getTranslation(TranslationKey.UsageEdit);
  const cancelSiteLabel = getTranslation(TranslationKey.UsageSiteCancelEdit);
  const deleteSiteAriaLabel = getTranslation(
    TranslationKey.UsageSiteDeleteAriaLabel,
  );
  const domainInvalidMessage = getTranslation(
    TranslationKey.ValidationDomainInvalid,
  );
  const submitLabel =
    mode === "create"
      ? getTranslation(TranslationKey.UsageCreateSubmit)
      : getTranslation(TranslationKey.UsageUpdateSubmit);
  const deleteLabel = getTranslation(TranslationKey.UsageDelete);
  const closeLabel = getTranslation(TranslationKey.UsageClose);
  const reminderTitle = getTranslation(
    TranslationKey.UsageUnsavedReminderTitle,
  );
  const reminderDescription = getTranslation(
    TranslationKey.UsageUnsavedReminderDescription,
  );

  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-600">
            Usage time block
          </p>
          <p className="text-lg font-semibold text-stone-900">
            {nameValue || nameLabel}
          </p>
        </div>
        <div className="flex gap-2">
          {onClose && closeLabel ? (
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded-2xl border border-stone-200 px-3 py-2 text-sm font-medium text-stone-700 transition hover:border-stone-300"
            >
              {closeLabel}
            </button>
          ) : null}
        </div>
      </div>

      <label className="block space-y-2">
        <span className="text-sm font-medium text-stone-800">{nameLabel}</span>
        <input
          type="text"
          value={nameValue}
          onChange={(event) => {
            onNameChange(event.target.value);
          }}
          placeholder={namePlaceholder}
          className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-amber-500"
        />
        {nameError ? <p className="text-sm text-red-700">{nameError}</p> : null}
      </label>

      <UsageLimitTimeInput
        label={limitLabel}
        hoursLabel={limitHoursLabel}
        minutesLabel={limitMinutesLabel}
        hoursValue={limitHoursValue}
        minutesValue={limitMinutesValue}
        hoursError={limitHoursError}
        minutesError={limitMinutesError}
        onHoursChange={onLimitHoursChange}
        onMinutesChange={onLimitMinutesChange}
      />

      <PopularSiteCarousel
        title={popularSitesTitle}
        items={popularSites}
        onSelect={onPopularSiteSelect}
      />

      <WebsiteListInput
        label={sitesLabel}
        value={sitesValue}
        siteNameRequiredMessage={siteNameLabel}
        domainInvalidMessage={domainInvalidMessage}
        siteNamePlaceholder={siteNamePlaceholder}
        siteDomainPlaceholder={siteDomainPlaceholder}
        addLabel={addSiteLabel}
        editLabel={editSiteLabel}
        cancelLabel={cancelSiteLabel}
        deleteAriaLabel={deleteSiteAriaLabel}
        listError={sitesListError}
        onChange={onSitesChange}
        clearListError={clearSitesListError}
        isSiteEditable={isSiteEditable}
      />
      {showUnsavedReminder ? (
        <div className="rounded-3xl border border-amber-300 bg-amber-50 px-4 py-3">
          <p className="text-sm font-semibold text-amber-800">
            {reminderTitle}
          </p>
          <p className="mt-1 text-sm leading-6 text-amber-700">
            {reminderDescription}
          </p>
        </div>
      ) : null}

      <div className="flex justify-between gap-3">
        {onDelete && deleteLabel ? (
          <button
            type="button"
            onClick={onDelete}
            className="cursor-pointer rounded-2xl border border-red-200 px-4 py-3 text-sm font-semibold text-red-700 transition hover:border-red-300"
          >
            {deleteLabel}
          </button>
        ) : (
          <span />
        )}
        <div title={submitDisabled ? submitTooltip : undefined}>
          <button
            type="button"
            onClick={onSubmit}
            disabled={submitDisabled}
            className="cursor-pointer rounded-2xl bg-stone-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-stone-700 disabled:cursor-not-allowed disabled:bg-stone-300"
          >
            {submitLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
