import { useState } from "react";
import {
  findBlockedSiteIndexByDomain,
  normalizeBlockedSiteDomain,
  validateBlockedSiteDomain,
  type BlockedSite,
} from "@/lib/blockedSites";
import type { WebsiteListInputProps } from "@/components/WebsiteListInput/interfaces";

export function WebsiteListInput({
  label,
  value,
  siteNameRequiredMessage,
  domainInvalidMessage,
  siteNamePlaceholder,
  siteDomainPlaceholder,
  addLabel,
  editLabel,
  cancelLabel,
  deleteAriaLabel,
  listError,
  onChange,
  clearListError,
  isSiteEditable = () => true,
  disabled = false,
}: WebsiteListInputProps) {
  const [siteName, setSiteName] = useState("");
  const [siteDomain, setSiteDomain] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [siteNameError, setSiteNameError] = useState<string | null>(null);
  const [siteDomainError, setSiteDomainError] = useState<string | null>(null);

  const baseInputClassName =
    "rounded-2xl border bg-white px-4 py-3 text-sm text-stone-900 outline-none transition";
  const normalInputClassName =
    "border-stone-200 focus:border-amber-500";
  const invalidInputClassName =
    "border-red-400 text-red-900 focus:border-red-500";

  function resetDraft() {
    setSiteName("");
    setSiteDomain("");
    setEditingIndex(null);
    setSiteNameError(null);
    setSiteDomainError(null);
    clearListError();
  }

  function commitDraft() {
    const trimmedSiteName = siteName.trim();

    if (!trimmedSiteName) {
      setSiteNameError(siteNameRequiredMessage);
      setSiteDomainError(null);
      return;
    }

    if (!validateBlockedSiteDomain(siteDomain)) {
      setSiteNameError(null);
      setSiteDomainError(domainInvalidMessage);
      return;
    }

    setSiteNameError(null);
    setSiteDomainError(null);

    const nextSite: BlockedSite = {
      name: trimmedSiteName,
      domain: normalizeBlockedSiteDomain(siteDomain),
    };

    const duplicateIndex = findBlockedSiteIndexByDomain(
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
            if (siteNameError) {
              setSiteNameError(null);
            }
            clearListError();
          }}
          placeholder={siteNamePlaceholder}
          aria-invalid={siteNameError ? "true" : "false"}
          className={`${baseInputClassName} ${siteNameError ? invalidInputClassName : normalInputClassName}`}
        />
        {siteNameError ? (
          <p className="text-sm text-red-700">{siteNameError}</p>
        ) : null}
        <input
          type="text"
          value={siteDomain}
          disabled={disabled}
          onChange={(event) => {
            setSiteDomain(event.target.value);
            if (siteDomainError) {
              setSiteDomainError(null);
            }
            clearListError();
          }}
          placeholder={siteDomainPlaceholder}
          aria-invalid={siteDomainError ? "true" : "false"}
          className={`${baseInputClassName} ${siteDomainError ? invalidInputClassName : normalInputClassName}`}
        />
        {siteDomainError ? (
          <p className="text-sm text-red-700">{siteDomainError}</p>
        ) : null}
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
              {cancelLabel}
            </button>
          ) : null}
        </div>
      </div>
      {listError ? <p className="text-sm text-red-700">{listError}</p> : null}
      <div
        className="grid w-full gap-3"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(min(250px, 100%), 1fr))",
          maxWidth: "calc(4 * 250px + 3 * 0.75rem)",
        }}
      >
        {value.map((site, index) => {
          const editable = isSiteEditable(site);

          return (
            <div
              key={`${site.domain}-${index}`}
              className="flex min-w-0 items-center justify-between gap-3 rounded-2xl border border-stone-200 bg-white px-4 py-3"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-stone-800">
                  {site.name}
                </p>
                <p className="truncate text-sm text-stone-500">{site.domain}</p>
              </div>
              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  disabled={!editable}
                  onClick={() => {
                    setSiteName(site.name);
                    setSiteDomain(site.domain);
                    setEditingIndex(index);
                    setSiteNameError(null);
                    setSiteDomainError(null);
                    clearListError();
                  }}
                  className="cursor-pointer rounded-2xl border border-stone-200 px-3 py-2 text-sm font-medium text-stone-700 transition hover:border-amber-300 disabled:cursor-not-allowed disabled:border-stone-200 disabled:text-stone-400"
                >
                  {editLabel}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    clearListError();
                    onChange(
                      value.filter((_, currentIndex) => currentIndex !== index),
                    );
                  }}
                  aria-label={deleteAriaLabel}
                  className="cursor-pointer rounded-2xl border border-red-200 p-2 text-red-700 transition hover:border-red-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                    className="h-5 w-5"
                  >
                    <path
                      d="M4 7h16"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                    <path
                      d="M9.5 3.5h5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                    <path
                      d="M7.5 7l.6 11.1a2 2 0 0 0 2 1.9h3.8a2 2 0 0 0 2-1.9L16.5 7"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10 10.5v5.5M14 10.5v5.5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
