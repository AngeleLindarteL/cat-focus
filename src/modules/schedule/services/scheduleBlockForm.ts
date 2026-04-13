import { DEFAULT_SCHEDULE_DAYS, DEFAULT_SCHEDULE_NAME, type BlockedSite, type ScheduleBlockDraft, type ScheduleDays } from "@/lib/schedules";
import { normalizeScheduleSiteDomain } from "@/modules/schedule/services/scheduleSitePresets";

export type ScheduleBlockFormValues = {
  name: string;
  days: ScheduleDays;
  from: string;
  to: string;
  sites: BlockedSite[];
};

export type ScheduleBlockFormErrors = Partial<
  Record<"name" | "from" | "to" | "sites", string>
>;

export function sanitizeScheduleName(value: string): string {
  return value.trim().replace(/\s+/g, " ");
}

export function normalizeDomainInput(value: string): string {
  return normalizeScheduleSiteDomain(value);
}

export function validateDomainInput(value: string): boolean {
  try {
    const normalizedDomain = normalizeDomainInput(value);
    return /^(?:[a-z0-9-]+\.)+[a-z]{2,}$/i.test(normalizedDomain);
  } catch {
    return false;
  }
}

export function createDefaultScheduleValues(): ScheduleBlockFormValues {
  return {
    name: DEFAULT_SCHEDULE_NAME,
    days: { ...DEFAULT_SCHEDULE_DAYS },
    from: "06:00",
    to: "18:00",
    sites: [],
  };
}

export function createScheduleFormValuesFromDraft(
  draft: ScheduleBlockDraft,
): ScheduleBlockFormValues {
  return {
    name: draft.name,
    days: { ...draft.schedule.days },
    from: draft.schedule.time.from,
    to: draft.schedule.time.to,
    sites: draft.sites.map((site) => ({ ...site })),
  };
}

export function validateScheduleBlockForm(
  values: ScheduleBlockFormValues,
  messages: {
    nameRequired: string;
    nameMinLength: string;
    nameMaxLength: string;
    timeRequired: string;
    timeRange: string;
    sitesRequired: string;
    siteNameRequired: string;
    domainInvalid: string;
  },
): ScheduleBlockFormErrors {
  const errors: ScheduleBlockFormErrors = {};
  const sanitizedName = sanitizeScheduleName(values.name);

  if (!sanitizedName) {
    errors.name = messages.nameRequired;
  } else if (sanitizedName.length < 3) {
    errors.name = messages.nameMinLength;
  } else if (sanitizedName.length > 48) {
    errors.name = messages.nameMaxLength;
  }

  if (!/^\d{2}:\d{2}$/.test(values.from)) {
    errors.from = messages.timeRequired;
  }

  if (!/^\d{2}:\d{2}$/.test(values.to)) {
    errors.to = messages.timeRequired;
  }

  if (!errors.from && !errors.to && values.to <= values.from) {
    errors.to = messages.timeRange;
  }

  if (!values.sites.length) {
    errors.sites = messages.sitesRequired;
  } else {
    for (const site of values.sites) {
      if (!site.name.trim()) {
        errors.sites = messages.siteNameRequired;
        break;
      }

      if (!validateDomainInput(site.domain)) {
        errors.sites = messages.domainInvalid;
        break;
      }
    }
  }

  return errors;
}

export function createScheduleBlockDraft(
  values: ScheduleBlockFormValues,
): ScheduleBlockDraft {
  return {
    name: sanitizeScheduleName(values.name),
    schedule: {
      days: { ...values.days },
      time: {
        from: values.from,
        to: values.to,
      },
    },
    sites: values.sites.map((site) => ({
      name: site.name.trim(),
      domain: normalizeDomainInput(site.domain),
    })),
  };
}

export function areScheduleBlockDraftsEqual(
  left: ScheduleBlockDraft,
  right: ScheduleBlockDraft,
): boolean {
  return JSON.stringify(left) === JSON.stringify(right);
}
