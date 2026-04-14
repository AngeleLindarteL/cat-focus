import {
  normalizeBlockedSiteDomain,
  validateBlockedSiteDomain,
  type BlockedSite,
} from "@/lib/blockedSites";
import {
  DEFAULT_USAGE_BLOCK_LIMIT_TIME,
  DEFAULT_USAGE_BLOCK_NAME,
  DEFAULT_USAGE_BLOCK_RESETS_AT,
  type UsageBlockDraft,
} from "@/lib/usage";

export type UsageBlockFormValues = {
  name: string;
  limitTime: string;
  sites: BlockedSite[];
};

export type UsageBlockFormErrors = Partial<
  Record<"name" | "limitTime" | "sites", string>
>;

export function sanitizeUsageBlockName(value: string): string {
  return value.trim().replace(/\s+/g, " ");
}

export function createDefaultUsageValues(): UsageBlockFormValues {
  return {
    name: DEFAULT_USAGE_BLOCK_NAME,
    limitTime: DEFAULT_USAGE_BLOCK_LIMIT_TIME,
    sites: [],
  };
}

export function createUsageFormValuesFromDraft(
  draft: UsageBlockDraft,
): UsageBlockFormValues {
  return {
    name: draft.name,
    limitTime: draft.limit.time,
    sites: draft.sites.map((site) => ({ ...site })),
  };
}

export function validateUsageBlockForm(
  values: UsageBlockFormValues,
  messages: {
    nameRequired: string;
    nameMinLength: string;
    timeRequired: string;
    sitesRequired: string;
    siteNameRequired: string;
    domainInvalid: string;
  },
): UsageBlockFormErrors {
  const errors: UsageBlockFormErrors = {};
  const sanitizedName = sanitizeUsageBlockName(values.name);

  if (!sanitizedName) {
    errors.name = messages.nameRequired;
  } else if (sanitizedName.length < 3) {
    errors.name = messages.nameMinLength;
  }

  if (!/^\d{2}:\d{2}$/.test(values.limitTime)) {
    errors.limitTime = messages.timeRequired;
  }

  if (!values.sites.length) {
    errors.sites = messages.sitesRequired;
  } else {
    for (const site of values.sites) {
      if (!site.name.trim()) {
        errors.sites = messages.siteNameRequired;
        break;
      }

      if (!validateBlockedSiteDomain(site.domain)) {
        errors.sites = messages.domainInvalid;
        break;
      }
    }
  }

  return errors;
}

export function createUsageBlockDraft(
  values: UsageBlockFormValues,
): UsageBlockDraft {
  return {
    name: sanitizeUsageBlockName(values.name),
    limit: {
      time: values.limitTime,
      resetsAt: DEFAULT_USAGE_BLOCK_RESETS_AT,
    },
    sites: values.sites.map((site) => ({
      name: site.name.trim(),
      domain: normalizeBlockedSiteDomain(site.domain),
    })),
  };
}

export function areUsageBlockDraftsEqual(
  left: UsageBlockDraft,
  right: UsageBlockDraft,
): boolean {
  return JSON.stringify(left) === JSON.stringify(right);
}
