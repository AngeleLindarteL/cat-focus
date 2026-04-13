import { WebsiteListInput } from "@/components/WebsiteListInput";
import { WeekdayToggleGroup } from "@/components/WeekdayToggleGroup";
import { PopularSiteCarousel } from "@/modules/schedule/components/PopularSiteCarousel";
import type { ScheduleBlockFormProps } from "@/modules/schedule/views/ScheduleBlockForm/interfaces";

export function ScheduleBlockForm({
  mode,
  reminderTitle,
  reminderDescription,
  showUnsavedReminder = false,
  nameLabel,
  namePlaceholder,
  nameValue,
  nameError,
  onNameChange,
  daysLabel,
  weekdayOptions,
  weekdayGroupKey,
  weekdayGroupRef,
  onWeekdayChange,
  fromLabel,
  fromValue,
  fromError,
  onFromChange,
  toLabel,
  toValue,
  toError,
  onToChange,
  sitesLabel,
  siteNameLabel,
  siteNamePlaceholder,
  siteDomainPlaceholder,
  popularSitesTitle,
  popularSites,
  onPopularSiteSelect,
  addSiteLabel,
  editSiteLabel,
  deleteSiteLabel,
  sitesValue,
  sitesError,
  onSitesChange,
  onSitesValidationError,
  clearSitesValidationError,
  isSiteEditable,
  submitLabel,
  onSubmit,
  submitDisabled,
  onDelete,
  deleteLabel,
  onClose,
  closeLabel,
}: ScheduleBlockFormProps) {
  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-600">
            Schedule block
          </p>
          <p className="text-lg font-semibold text-stone-900">{nameValue || nameLabel}</p>
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

      {mode === "edit" && showUnsavedReminder && reminderTitle && reminderDescription ? (
        <div className="rounded-3xl border border-amber-300 bg-amber-50 px-4 py-3">
          <p className="text-sm font-semibold text-amber-800">{reminderTitle}</p>
          <p className="mt-1 text-sm leading-6 text-amber-700">{reminderDescription}</p>
        </div>
      ) : null}

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

      <WeekdayToggleGroup
        key={weekdayGroupKey}
        ref={weekdayGroupRef}
        label={daysLabel}
        options={weekdayOptions}
        onChange={onWeekdayChange}
      />

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block space-y-2">
          <span className="text-sm font-medium text-stone-800">{fromLabel}</span>
          <input
            type="time"
            value={fromValue}
            onChange={(event) => {
              onFromChange(event.target.value);
            }}
            className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-amber-500"
          />
          {fromError ? <p className="text-sm text-red-700">{fromError}</p> : null}
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-stone-800">{toLabel}</span>
          <input
            type="time"
            value={toValue}
            onChange={(event) => {
              onToChange(event.target.value);
            }}
            className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-amber-500"
          />
          {toError ? <p className="text-sm text-red-700">{toError}</p> : null}
        </label>
      </div>

      <PopularSiteCarousel
        title={popularSitesTitle}
        items={popularSites}
        onSelect={onPopularSiteSelect}
      />

      <WebsiteListInput
        label={sitesLabel}
        value={sitesValue}
        siteNameLabel={siteNameLabel}
        siteNamePlaceholder={siteNamePlaceholder}
        siteDomainPlaceholder={siteDomainPlaceholder}
        addLabel={addSiteLabel}
        editLabel={editSiteLabel}
        deleteLabel={deleteSiteLabel}
        error={sitesError}
        onChange={onSitesChange}
        onValidationError={onSitesValidationError}
        clearValidationError={clearSitesValidationError}
        isSiteEditable={isSiteEditable}
      />

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
  );
}
