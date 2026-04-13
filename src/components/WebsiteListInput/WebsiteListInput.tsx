import { useState } from "react";
import type { BlockedSite } from "@/lib/schedules";
import {
  normalizeDomainInput,
  validateDomainInput,
} from "@/modules/schedule/services/scheduleBlockForm";
import { findScheduleSiteIndexByDomain } from "@/modules/schedule/services/scheduleSitePresets";
import type { WebsiteListInputProps } from "@/components/WebsiteListInput/interfaces";

export function WebsiteListInput({
  label,
  value,
  siteNameLabel,
  siteNamePlaceholder,
  siteDomainPlaceholder,
  addLabel,
  editLabel,
  deleteLabel,
  error,
  onChange,
  onValidationError,
  clearValidationError,
  isSiteEditable = () => true,
  disabled = false,
}: WebsiteListInputProps) {
  const [siteName, setSiteName] = useState("");
  const [siteDomain, setSiteDomain] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  function resetDraft() {
    setSiteName("");
    setSiteDomain("");
    setEditingIndex(null);
    clearValidationError();
  }

  function commitDraft() {
    const trimmedSiteName = siteName.trim();

    if (!trimmedSiteName) {
      onValidationError(siteNameLabel);
      return;
    }

    if (!validateDomainInput(siteDomain)) {
      onValidationError(error ?? "Invalid domain");
      return;
    }

    const nextSite: BlockedSite = {
      name: trimmedSiteName,
      domain: normalizeDomainInput(siteDomain),
    };

    const duplicateIndex = findScheduleSiteIndexByDomain(
      value,
      nextSite.domain,
    );

    if (duplicateIndex >= 0 && duplicateIndex !== editingIndex) {
      resetDraft();
      return;
    }

    if (editingIndex === null) {
      onChange([...value, nextSite]);
    } else {
      onChange(
        value.map((currentValue, index) =>
          index === editingIndex ? nextSite : currentValue,
        ),
      );
    }

    resetDraft();
  }

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-stone-800">{label}</p>
      <div className="grid gap-3 rounded-3xl border border-stone-200 bg-stone-50/70 p-4">
        <input
          type="text"
          value={siteName}
          disabled={disabled}
          onChange={(event) => {
            setSiteName(event.target.value);
          }}
          placeholder={siteNamePlaceholder}
          className="rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-amber-500"
        />
        <input
          type="text"
          value={siteDomain}
          disabled={disabled}
          onChange={(event) => {
            setSiteDomain(event.target.value);
          }}
          placeholder={siteDomainPlaceholder}
          className="rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-amber-500"
        />
        <div className="flex gap-3">
          <button
            type="button"
            disabled={disabled}
            onClick={commitDraft}
            className="cursor-pointer rounded-2xl bg-stone-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-stone-700 disabled:cursor-not-allowed"
          >
            {editingIndex === null ? addLabel : editLabel}
          </button>
          {editingIndex !== null ? (
            <button
              type="button"
              onClick={resetDraft}
              className="cursor-pointer rounded-2xl border border-stone-200 px-4 py-3 text-sm font-semibold text-stone-700 transition hover:border-stone-300"
            >
              Cancel
            </button>
          ) : null}
        </div>
      </div>
      {error ? <p className="text-sm text-red-700">{error}</p> : null}
      <div className="space-y-2">
        {value.map((site, index) => {
          const editable = isSiteEditable(site);

          return (
            <div
              key={`${site.domain}-${index}`}
              className="flex items-center justify-between rounded-2xl border border-stone-200 bg-white px-4 py-3"
            >
              <div>
                <p className="text-sm font-semibold text-stone-800">
                  {site.name}
                </p>
                <p className="text-sm text-stone-500">{site.domain}</p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  disabled={!editable}
                  onClick={() => {
                    setSiteName(site.name);
                    setSiteDomain(site.domain);
                    setEditingIndex(index);
                    clearValidationError();
                  }}
                  className="cursor-pointer rounded-2xl border border-stone-200 px-3 py-2 text-sm font-medium text-stone-700 transition hover:border-amber-300 disabled:cursor-not-allowed disabled:border-stone-200 disabled:text-stone-400"
                >
                  {editLabel}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onChange(
                      value.filter((_, currentIndex) => currentIndex !== index),
                    );
                  }}
                  className="cursor-pointer rounded-2xl border border-red-200 px-3 py-2 text-sm font-medium text-red-700 transition hover:border-red-300"
                >
                  {deleteLabel}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
