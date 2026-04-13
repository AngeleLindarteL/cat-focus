import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { DeleteScheduleModal } from "@/components/DeleteScheduleModal";
import type { DayToggleOption, WeekdayToggleGroupRef } from "@/components/WeekdayToggleGroup";
import { TranslationKey, type UseTranslationResult } from "@/lib/i18n";
import type { ScheduleRepository } from "@/lib/repositories/scheduleRepository";
import { scheduleRepository as defaultScheduleRepository } from "@/lib/repositories/scheduleRepository";
import type { ScheduleBlock } from "@/lib/schedules";
import { ScheduleCard } from "@/modules/schedule/views/ScheduleCard";
import { ScheduleEmptyState } from "@/modules/schedule/views/ScheduleEmptyState";
import {
  createScheduleSitePresetItems,
  isPresetBackedScheduleSite,
  type ScheduleSitePresetItem,
  toggleScheduleSitePreset,
} from "@/modules/schedule/services/scheduleSitePresets";
import { ScheduleBlockForm } from "@/modules/schedule/views/ScheduleBlockForm";
import { ScheduleSummary } from "@/modules/schedule/views/ScheduleSummary";
import {
  areScheduleBlockDraftsEqual,
  createDefaultScheduleValues,
  createScheduleBlockDraft,
  createScheduleFormValuesFromDraft,
  type ScheduleBlockFormErrors,
  type ScheduleBlockFormValues,
  validateScheduleBlockForm,
} from "@/modules/schedule/services/scheduleBlockForm";

type ScheduleBlockContainerProps = {
  isOnboarding: boolean;
  getTranslation: UseTranslationResult["getTranslation"];
  repository?: ScheduleRepository;
  onSchedulesChange?: (schedules: ScheduleBlock[]) => void;
};

function createWeekdayOptions(
  getTranslation: UseTranslationResult["getTranslation"],
  days: ScheduleBlockFormValues["days"],
): DayToggleOption[] {
  return [
    {
      name: "monday",
      label: getTranslation(TranslationKey.WeekdayMonday),
      default: days.monday,
    },
    {
      name: "tuesday",
      label: getTranslation(TranslationKey.WeekdayTuesday),
      default: days.tuesday,
    },
    {
      name: "wednesday",
      label: getTranslation(TranslationKey.WeekdayWednesday),
      default: days.wednesday,
    },
    {
      name: "thursday",
      label: getTranslation(TranslationKey.WeekdayThursday),
      default: days.thursday,
    },
    {
      name: "friday",
      label: getTranslation(TranslationKey.WeekdayFriday),
      default: days.friday,
    },
    {
      name: "saturday",
      label: getTranslation(TranslationKey.WeekdaySaturday),
      default: days.saturday,
    },
    {
      name: "sunday",
      label: getTranslation(TranslationKey.WeekdaySunday),
      default: days.sunday,
    },
  ];
}

export function ScheduleBlockContainer({
  isOnboarding,
  getTranslation,
  repository = defaultScheduleRepository,
  onSchedulesChange,
}: ScheduleBlockContainerProps) {
  const [schedules, setSchedules] = useState<ScheduleBlock[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedScheduleId, setExpandedScheduleId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [draft, setDraft] = useState<ScheduleBlockFormValues>(createDefaultScheduleValues);
  const [errors, setErrors] = useState<ScheduleBlockFormErrors>({});
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const weekdayGroupRef = useRef<WeekdayToggleGroupRef | null>(null);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    const storedSchedules = await repository.findAll();
    setSchedules(storedSchedules);
    onSchedulesChange?.(storedSchedules);

    if (isOnboarding) {
      if (storedSchedules.length > 0) {
        setExpandedScheduleId(storedSchedules[0].id);
        setIsCreating(false);
        setDraft(createScheduleFormValuesFromDraft(storedSchedules[0]));
      } else {
        setExpandedScheduleId(null);
      }
    }

    setIsLoading(false);
  }, [repository, isOnboarding, onSchedulesChange]);

  useEffect(() => {
    let isMounted = true;

    void repository.findAll().then((storedSchedules) => {
      if (!isMounted) {
        return;
      }

      setSchedules(storedSchedules);
      onSchedulesChange?.(storedSchedules);

      if (isOnboarding) {
        if (storedSchedules.length > 0) {
          setExpandedScheduleId(storedSchedules[0].id);
          setIsCreating(false);
          setDraft(createScheduleFormValuesFromDraft(storedSchedules[0]));
        } else {
          setExpandedScheduleId(null);
        }
      }

      setIsLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, [repository, isOnboarding, onSchedulesChange]);

  const weekdayOptions = useMemo(
    () => createWeekdayOptions(getTranslation, draft.days),
    [draft.days, getTranslation],
  );
  const popularSites = useMemo(
    () => createScheduleSitePresetItems(draft.sites),
    [draft.sites],
  );

  function handlePopularSiteSelect(item: ScheduleSitePresetItem) {
    setDraft((currentValue) => ({
      ...currentValue,
      sites: toggleScheduleSitePreset(currentValue.sites, item),
    }));
    setErrors((currentValue) => ({ ...currentValue, sites: undefined }));
  }

  function openCreateForm() {
    setDraft(createDefaultScheduleValues());
    setErrors({});
    setExpandedScheduleId(null);
    setIsCreating(true);
  }

  function openEditForm(schedule: ScheduleBlock) {
    setDraft(createScheduleFormValuesFromDraft(schedule));
    setErrors({});
    setExpandedScheduleId(schedule.id);
    setIsCreating(false);
  }

  async function handleSubmit(activeScheduleId: string | null) {
    const nextValues: ScheduleBlockFormValues = {
      ...draft,
    };
    const nextErrors = validateScheduleBlockForm(nextValues, {
      nameRequired: getTranslation(TranslationKey.ValidationScheduleNameRequired),
      nameMinLength: getTranslation(
        TranslationKey.ValidationScheduleNameMinLength,
      ),
      nameMaxLength: getTranslation(
        TranslationKey.ValidationScheduleNameMaxLength,
      ),
      timeRequired: getTranslation(TranslationKey.ValidationTimeRequired),
      timeRange: getTranslation(TranslationKey.ValidationTimeRange),
      sitesRequired: getTranslation(TranslationKey.ValidationSitesRequired),
      siteNameRequired: getTranslation(
        TranslationKey.ValidationSiteNameRequired,
      ),
      domainInvalid: getTranslation(TranslationKey.ValidationDomainInvalid),
    });

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    if (isOnboarding && schedules.length > 0 && !activeScheduleId) {
      return;
    }

    const nextDraft = createScheduleBlockDraft(nextValues);

    if (activeScheduleId) {
      await repository.updateOneById(activeScheduleId, nextDraft);
    } else {
      const createdSchedule = await repository.insertOne(nextDraft);
      setExpandedScheduleId(createdSchedule.id);
      setIsCreating(false);
    }

    await refresh();
  }

  async function handleDelete() {
    if (!deleteTargetId) {
      return;
    }

    await repository.deleteOneById(deleteTargetId);
    setDeleteTargetId(null);
    setExpandedScheduleId(null);
    setDraft(createDefaultScheduleValues());
    await refresh();
  }

  const activeSchedule = schedules.find((schedule) => schedule.id === expandedScheduleId) ?? null;
  const showEmptyState = !isLoading && schedules.length === 0 && !isCreating;
  const canCollapse = !isOnboarding;
  const canDelete = !isOnboarding && !!activeSchedule;
  const renderCreateForm = isCreating && (!isOnboarding || schedules.length === 0);
  const activeScheduleDraft = activeSchedule
    ? createScheduleBlockDraft(draft)
    : null;
  const persistedActiveScheduleDraft = activeSchedule
    ? createScheduleBlockDraft(createScheduleFormValuesFromDraft(activeSchedule))
    : null;
  const isActiveScheduleDirty =
    !!activeSchedule &&
    !!activeScheduleDraft &&
    !!persistedActiveScheduleDraft &&
    !areScheduleBlockDraftsEqual(activeScheduleDraft, persistedActiveScheduleDraft);

  return (
    <div className="space-y-4">
      {!isOnboarding ? (
        <div className="flex justify-end">
          <button
            type="button"
            onClick={openCreateForm}
            className="cursor-pointer rounded-2xl bg-stone-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-stone-700"
          >
            {getTranslation(TranslationKey.ScheduleCreate)}
          </button>
        </div>
      ) : null}

      {showEmptyState ? (
        <ScheduleEmptyState
          title={getTranslation(TranslationKey.ScheduleEmptyTitle)}
          description={getTranslation(TranslationKey.ScheduleEmptyDescription)}
          actionLabel={getTranslation(TranslationKey.ScheduleCreateFirst)}
          onAction={openCreateForm}
        />
      ) : null}

      {renderCreateForm ? (
        <ScheduleCard
          isExpanded
          isHighlighted={false}
          onExpand={() => undefined}
          summary={null}
          expandedContent={
            <ScheduleBlockForm
              mode="create"
              showUnsavedReminder={false}
              nameLabel={getTranslation(TranslationKey.ScheduleNameLabel)}
              namePlaceholder={getTranslation(
                TranslationKey.ScheduleNamePlaceholder,
              )}
              nameValue={draft.name}
              nameError={errors.name}
              onNameChange={(value) => {
                setDraft((currentValue) => ({ ...currentValue, name: value }));
              }}
              daysLabel={getTranslation(TranslationKey.ScheduleDaysLabel)}
              weekdayOptions={weekdayOptions}
              weekdayGroupKey={`create-${weekdayOptions.map((option) => Number(option.default)).join("-")}`}
              weekdayGroupRef={weekdayGroupRef}
              onWeekdayChange={(value) => {
                setDraft((currentValue) => ({ ...currentValue, days: value }));
              }}
              fromLabel={getTranslation(TranslationKey.ScheduleFromLabel)}
              fromValue={draft.from}
              fromError={errors.from}
              onFromChange={(value) => {
                setDraft((currentValue) => ({ ...currentValue, from: value }));
              }}
              toLabel={getTranslation(TranslationKey.ScheduleToLabel)}
              toValue={draft.to}
              toError={errors.to}
              onToChange={(value) => {
                setDraft((currentValue) => ({ ...currentValue, to: value }));
              }}
              sitesLabel={getTranslation(TranslationKey.ScheduleSitesLabel)}
              siteNameLabel={getTranslation(
                TranslationKey.ValidationSiteNameRequired,
              )}
              siteNamePlaceholder={getTranslation(
                TranslationKey.ScheduleSiteNamePlaceholder,
              )}
              siteDomainPlaceholder={getTranslation(
                TranslationKey.ScheduleSiteDomainPlaceholder,
              )}
              popularSitesTitle={getTranslation(
                TranslationKey.SchedulePopularSitesTitle,
              )}
              popularSites={popularSites}
              onPopularSiteSelect={handlePopularSiteSelect}
              addSiteLabel={getTranslation(TranslationKey.ScheduleCreate)}
              editSiteLabel={getTranslation(TranslationKey.ScheduleEdit)}
              deleteSiteLabel={getTranslation(TranslationKey.ScheduleDelete)}
              sitesValue={draft.sites}
              sitesError={errors.sites}
              onSitesChange={(nextSites) => {
                setDraft((currentValue) => ({ ...currentValue, sites: nextSites }));
                setErrors((currentValue) => ({ ...currentValue, sites: undefined }));
              }}
              onSitesValidationError={(message) => {
                setErrors((currentValue) => ({ ...currentValue, sites: message }));
              }}
              clearSitesValidationError={() => {
                setErrors((currentValue) => ({ ...currentValue, sites: undefined }));
              }}
              isSiteEditable={(site) => !isPresetBackedScheduleSite(site)}
              submitLabel={getTranslation(TranslationKey.ScheduleSave)}
              onSubmit={() => {
                void handleSubmit(null);
              }}
              onClose={
                canCollapse
                  ? () => {
                      setIsCreating(false);
                    }
                  : undefined
              }
              closeLabel={getTranslation(TranslationKey.ScheduleClose)}
            />
          }
        />
      ) : null}

      {schedules.map((schedule) => {
        const isExpanded = schedule.id === expandedScheduleId;
        const formValues = isExpanded ? draft : createScheduleFormValuesFromDraft(schedule);
        const currentWeekdayOptions = createWeekdayOptions(
          getTranslation,
          formValues.days,
        );

        return (
          <ScheduleCard
            key={schedule.id}
            isExpanded={isExpanded}
            isHighlighted={isExpanded && schedule.id === activeSchedule?.id && isActiveScheduleDirty}
            onExpand={() => {
              openEditForm(schedule);
            }}
            summary={
              <ScheduleSummary
                name={schedule.name}
                days={schedule.schedule.days}
                from={schedule.schedule.time.from}
                to={schedule.schedule.time.to}
                sitesCount={schedule.sites.length}
                sitesLabel={getTranslation(TranslationKey.ScheduleSummarySites)}
              />
            }
            expandedContent={
              <ScheduleBlockForm
                mode="edit"
                reminderTitle={getTranslation(
                  TranslationKey.ScheduleUnsavedReminderTitle,
                )}
                reminderDescription={getTranslation(
                  TranslationKey.ScheduleUnsavedReminderDescription,
                )}
                showUnsavedReminder={
                  isExpanded && schedule.id === activeSchedule?.id && isActiveScheduleDirty
                }
                nameLabel={getTranslation(TranslationKey.ScheduleNameLabel)}
                namePlaceholder={getTranslation(
                  TranslationKey.ScheduleNamePlaceholder,
                )}
                nameValue={draft.name}
                nameError={errors.name}
                onNameChange={(value) => {
                  setDraft((currentValue) => ({ ...currentValue, name: value }));
                }}
                daysLabel={getTranslation(TranslationKey.ScheduleDaysLabel)}
                weekdayOptions={currentWeekdayOptions}
                weekdayGroupKey={`${schedule.id}-${currentWeekdayOptions.map((option) => Number(option.default)).join("-")}`}
                weekdayGroupRef={weekdayGroupRef}
                onWeekdayChange={(value) => {
                  setDraft((currentValue) => ({ ...currentValue, days: value }));
                }}
                fromLabel={getTranslation(TranslationKey.ScheduleFromLabel)}
                fromValue={draft.from}
                fromError={errors.from}
                onFromChange={(value) => {
                  setDraft((currentValue) => ({ ...currentValue, from: value }));
                }}
                toLabel={getTranslation(TranslationKey.ScheduleToLabel)}
                toValue={draft.to}
                toError={errors.to}
                onToChange={(value) => {
                  setDraft((currentValue) => ({ ...currentValue, to: value }));
                }}
                sitesLabel={getTranslation(TranslationKey.ScheduleSitesLabel)}
                siteNameLabel={getTranslation(
                  TranslationKey.ValidationSiteNameRequired,
                )}
                siteNamePlaceholder={getTranslation(
                  TranslationKey.ScheduleSiteNamePlaceholder,
                )}
                siteDomainPlaceholder={getTranslation(
                  TranslationKey.ScheduleSiteDomainPlaceholder,
                )}
                popularSitesTitle={getTranslation(
                  TranslationKey.SchedulePopularSitesTitle,
                )}
                popularSites={popularSites}
                onPopularSiteSelect={handlePopularSiteSelect}
                addSiteLabel={getTranslation(TranslationKey.ScheduleCreate)}
                editSiteLabel={getTranslation(TranslationKey.ScheduleEdit)}
                deleteSiteLabel={getTranslation(TranslationKey.ScheduleDelete)}
                sitesValue={draft.sites}
                sitesError={errors.sites}
                onSitesChange={(nextSites) => {
                  setDraft((currentValue) => ({ ...currentValue, sites: nextSites }));
                  setErrors((currentValue) => ({ ...currentValue, sites: undefined }));
                }}
                onSitesValidationError={(message) => {
                  setErrors((currentValue) => ({ ...currentValue, sites: message }));
                }}
                clearSitesValidationError={() => {
                  setErrors((currentValue) => ({ ...currentValue, sites: undefined }));
                }}
                isSiteEditable={(site) => !isPresetBackedScheduleSite(site)}
                submitLabel={getTranslation(TranslationKey.ScheduleSave)}
                onSubmit={() => {
                  void handleSubmit(schedule.id);
                }}
                onDelete={
                  canDelete
                    ? () => {
                        setDeleteTargetId(schedule.id);
                      }
                    : undefined
                }
                deleteLabel={getTranslation(TranslationKey.ScheduleDelete)}
                onClose={
                  canCollapse
                    ? () => {
                        setExpandedScheduleId(null);
                        setErrors({});
                      }
                    : undefined
                }
                closeLabel={getTranslation(TranslationKey.ScheduleClose)}
              />
            }
          />
        );
      })}

      <DeleteScheduleModal
        isOpen={deleteTargetId !== null}
        title={getTranslation(TranslationKey.ScheduleDeleteConfirmTitle)}
        description={getTranslation(
          TranslationKey.ScheduleDeleteConfirmDescription,
        )}
        confirmLabel={getTranslation(
          TranslationKey.ScheduleDeleteConfirmAction,
        )}
        cancelLabel={getTranslation(TranslationKey.ScheduleCancel)}
        onConfirm={() => {
          void handleDelete();
        }}
        onCancel={() => {
          setDeleteTargetId(null);
        }}
      />
    </div>
  );
}
