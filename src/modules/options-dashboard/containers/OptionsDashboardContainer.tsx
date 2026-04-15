import { useEffect, useMemo, useState, type ReactNode } from "react";
import { TranslationKey, type UseTranslationResult } from "@/lib/i18n";
import type { CatRepository } from "@/lib/repositories/catRepository";
import {
  scheduleRepository as defaultScheduleRepository,
  type ScheduleRepository,
} from "@/lib/repositories/scheduleRepository";
import {
  usageRepository as defaultUsageRepository,
  type UsageRepository,
} from "@/lib/repositories/usageRepository";
import {
  userPreferencesRepository as defaultUserPreferencesRepository,
  type UserPreferencesRepository,
} from "@/lib/repositories/userPreferencesRepository";
import { ScheduleBlockContainer } from "@/modules/schedule/containers/ScheduleBlockContainer";
import { UsageBlockContainer } from "@/modules/usage/containers/UsageBlockContainer";
import { OptionsCatProfileContainer } from "@/modules/options-dashboard/containers/OptionsCatProfileContainer";
import { OptionsPreferencesContainer } from "@/modules/options-dashboard/containers/OptionsPreferencesContainer";
import {
  DEFAULT_OPTIONS_DASHBOARD_SECTION_ID,
  getOptionsDashboardHash,
  getOptionsDashboardSectionFromHash,
  type OptionsDashboardSectionId,
} from "@/modules/options-dashboard/services/optionsDashboardNavigation";
import { OptionsDashboardView } from "@/modules/options-dashboard/views/OptionsDashboardView";

type OptionsDashboardContainerProps = {
  getTranslation: UseTranslationResult["getTranslation"];
  catRepository: CatRepository;
  scheduleRepository?: ScheduleRepository;
  usageRepository?: UsageRepository;
  userPreferencesRepository?: UserPreferencesRepository;
};

export function OptionsDashboardContainer({
  getTranslation,
  catRepository,
  scheduleRepository = defaultScheduleRepository,
  usageRepository = defaultUsageRepository,
  userPreferencesRepository = defaultUserPreferencesRepository,
}: OptionsDashboardContainerProps) {
  const [activeSectionId, setActiveSectionId] = useState<OptionsDashboardSectionId>(
    () => {
      if (typeof window === "undefined") {
        return DEFAULT_OPTIONS_DASHBOARD_SECTION_ID;
      }

      return getOptionsDashboardSectionFromHash(window.location.hash);
    },
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    function syncSectionFromHash() {
      const nextSectionId = getOptionsDashboardSectionFromHash(window.location.hash);

      setActiveSectionId(nextSectionId);

      if (window.location.hash !== getOptionsDashboardHash(nextSectionId)) {
        window.history.replaceState(
          null,
          "",
          `${window.location.pathname}${window.location.search}${getOptionsDashboardHash(nextSectionId)}`,
        );
      }
    }

    syncSectionFromHash();
    window.addEventListener("hashchange", syncSectionFromHash);

    return () => {
      window.removeEventListener("hashchange", syncSectionFromHash);
    };
  }, []);

  const sections = useMemo(
    () => [
      {
        id: "your-cat" as const,
        label: getTranslation(TranslationKey.OptionsSectionYourCatLabel),
        description: getTranslation(TranslationKey.OptionsSectionYourCatDescription),
      },
      {
        id: "usage-time-limits" as const,
        label: getTranslation(TranslationKey.OptionsSectionUsageLabel),
        description: getTranslation(TranslationKey.OptionsSectionUsageDescription),
      },
      {
        id: "schedule-limits" as const,
        label: getTranslation(TranslationKey.OptionsSectionScheduleLabel),
        description: getTranslation(TranslationKey.OptionsSectionScheduleDescription),
      },
      {
        id: "preferences" as const,
        label: getTranslation(TranslationKey.OptionsSectionPreferencesLabel),
        description: getTranslation(TranslationKey.OptionsSectionPreferencesDescription),
      },
    ],
    [getTranslation],
  );

  const activeSection = sections.find((section) => section.id === activeSectionId) ?? sections[0];

  function handleSectionSelect(sectionId: OptionsDashboardSectionId) {
    if (typeof window === "undefined") {
      setActiveSectionId(sectionId);
      return;
    }

    window.location.hash = getOptionsDashboardHash(sectionId);
  }

  const activeSectionContentById: Record<OptionsDashboardSectionId, ReactNode> = {
    "your-cat": (
      <OptionsCatProfileContainer
        getTranslation={getTranslation}
        catRepository={catRepository}
      />
    ),
    "usage-time-limits": (
      <UsageBlockContainer
        isOnboarding={false}
        getTranslation={getTranslation}
        repository={usageRepository}
      />
    ),
    "schedule-limits": (
      <ScheduleBlockContainer
        isOnboarding={false}
        getTranslation={getTranslation}
        repository={scheduleRepository}
      />
    ),
    preferences: (
      <OptionsPreferencesContainer
        getTranslation={getTranslation}
        repository={userPreferencesRepository}
      />
    ),
  };

  return (
    <OptionsDashboardView
      getTranslation={getTranslation}
      sections={sections}
      activeSectionId={activeSection.id}
      activeSectionTitle={activeSection.label}
      activeSectionDescription={activeSection.description}
      activeSectionContent={activeSectionContentById[activeSection.id]}
      onSectionSelect={handleSectionSelect}
    />
  );
}
