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
  limitHours: string;
  limitMinutes: string;
  sites: BlockedSite[];
};

export type UsageBlockFormErrors = Partial<
  Record<"name" | "limitHours" | "limitMinutes" | "sites", string>
>;

export function sanitizeUsageBlockName(value: string): string {
  return value.trim().replace(/\s+/g, " ");
}

export function createDefaultUsageValues(): UsageBlockFormValues {
  return {
    name: DEFAULT_USAGE_BLOCK_NAME,
    limitHours: DEFAULT_USAGE_BLOCK_LIMIT_TIME.slice(0, 2),
    limitMinutes: DEFAULT_USAGE_BLOCK_LIMIT_TIME.slice(3, 5),
    sites: [],
  };
}

export function createUsageFormValuesFromDraft(
  draft: UsageBlockDraft,
): UsageBlockFormValues {
  return {
    name: draft.name,
    limitHours: draft.limit.time.slice(0, 2),
    limitMinutes: draft.limit.time.slice(3, 5),
    sites: draft.sites.map((site) => ({ ...site })),
  };
}

export function validateUsageBlockForm(
  values: UsageBlockFormValues,
  messages: {
    nameRequired: string;
    nameMinLength: string;
    hoursRequired: string;
    hoursInvalid: string;
    minutesRequired: string;
    minutesInvalid: string;
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

  if (!values.limitHours) {
    errors.limitHours = messages.hoursRequired;
  } else {
    const parsedHours = Number(values.limitHours);

    if (!Number.isInteger(parsedHours) || parsedHours < 0 || parsedHours > 23) {
      errors.limitHours = messages.hoursInvalid;
    }
  }

  if (!values.limitMinutes) {
    errors.limitMinutes = messages.minutesRequired;
  } else {
    const parsedMinutes = Number(values.limitMinutes);

    if (
      !Number.isInteger(parsedMinutes) ||
      parsedMinutes < 0 ||
      parsedMinutes > 59
    ) {
      errors.limitMinutes = messages.minutesInvalid;
    }
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
  const limitHours = values.limitHours.padStart(2, "0");
  const limitMinutes = values.limitMinutes.padStart(2, "0");

  return {
    name: sanitizeUsageBlockName(values.name),
    limit: {
      time: `${limitHours}:${limitMinutes}`,
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
