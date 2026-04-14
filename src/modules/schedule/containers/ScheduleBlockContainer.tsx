import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { DayToggleOption, WeekdayToggleGroupRef } from "@/components/WeekdayToggleGroup";
import { TranslationKey, type UseTranslationResult } from "@/lib/i18n";
import type { ScheduleRepository } from "@/lib/repositories/scheduleRepository";
import { scheduleRepository as defaultScheduleRepository } from "@/lib/repositories/scheduleRepository";
import type { ScheduleBlock } from "@/lib/schedules";
import { DeleteScheduleModal } from "@/modules/schedule/components/DeleteScheduleModal";
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
  onHasBlockingUnsavedChangesChange?: (hasUnsavedChanges: boolean) => void;
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
  onHasBlockingUnsavedChangesChange,
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
  const validationMessages = useMemo(
    () => ({
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
    }),
    [getTranslation],
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
    const nextErrors = validateScheduleBlockForm(nextValues, validationMessages);

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
  const defaultCreateDraft = createScheduleBlockDraft(createDefaultScheduleValues());
  const currentCreateDraft = createScheduleBlockDraft(draft);
  const isCreateDirty =
    isCreating &&
    !areScheduleBlockDraftsEqual(currentCreateDraft, defaultCreateDraft);
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
  const hasBlockingUnsavedChanges = isCreateDirty || isActiveScheduleDirty;
  const draftValidationErrors = useMemo(
    () => validateScheduleBlockForm(draft, validationMessages),
    [draft, validationMessages],
  );
  const hasDraftValidationErrors =
    Object.keys(draftValidationErrors).length > 0;
  const createSubmitDisabled = !isCreateDirty || hasDraftValidationErrors;
  const editSubmitDisabled = !isActiveScheduleDirty || hasDraftValidationErrors;
  const submitTooltip = !hasDraftValidationErrors
    ? getTranslation(TranslationKey.FormSubmitDisabledNoChanges)
    : getTranslation(TranslationKey.FormSubmitDisabledInvalid);

  useEffect(() => {
    onHasBlockingUnsavedChangesChange?.(hasBlockingUnsavedChanges);
  }, [hasBlockingUnsavedChanges, onHasBlockingUnsavedChangesChange]);

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
          getTranslation={getTranslation}
          onAction={openCreateForm}
        />
      ) : null}

      {renderCreateForm ? (
        <ScheduleCard
          isExpanded
          isHighlighted={isCreateDirty}
          onExpand={() => undefined}
          summary={null}
          expandedContent={
            <ScheduleBlockForm
              mode="create"
              getTranslation={getTranslation}
              showUnsavedReminder={false}
              nameValue={draft.name}
              nameError={errors.name}
              onNameChange={(value) => {
                setDraft((currentValue) => ({ ...currentValue, name: value }));
              }}
              weekdayOptions={weekdayOptions}
              weekdayGroupKey={`create-${weekdayOptions.map((option) => Number(option.default)).join("-")}`}
              weekdayGroupRef={weekdayGroupRef}
              onWeekdayChange={(value) => {
                setDraft((currentValue) => ({ ...currentValue, days: value }));
              }}
              fromValue={draft.from}
              fromError={errors.from}
              onFromChange={(value) => {
                setDraft((currentValue) => ({ ...currentValue, from: value }));
              }}
              toValue={draft.to}
              toError={errors.to}
              onToChange={(value) => {
                setDraft((currentValue) => ({ ...currentValue, to: value }));
              }}
              popularSites={popularSites}
              onPopularSiteSelect={handlePopularSiteSelect}
              sitesValue={draft.sites}
              sitesListError={errors.sites}
              onSitesChange={(nextSites) => {
                setDraft((currentValue) => ({ ...currentValue, sites: nextSites }));
                setErrors((currentValue) => ({ ...currentValue, sites: undefined }));
              }}
              clearSitesListError={() => {
                setErrors((currentValue) => ({ ...currentValue, sites: undefined }));
              }}
              isSiteEditable={(site) => !isPresetBackedScheduleSite(site)}
              onSubmit={() => {
                void handleSubmit(null);
              }}
              submitDisabled={createSubmitDisabled}
              submitTooltip={createSubmitDisabled ? submitTooltip : undefined}
              onClose={
                canCollapse
                  ? () => {
                      setIsCreating(false);
                      setDraft(createDefaultScheduleValues());
                      setErrors({});
                    }
                  : undefined
              }
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
                getTranslation={getTranslation}
                name={schedule.name}
                days={schedule.schedule.days}
                from={schedule.schedule.time.from}
                to={schedule.schedule.time.to}
                sitesCount={schedule.sites.length}
              />
            }
            expandedContent={
              <ScheduleBlockForm
                mode="edit"
                getTranslation={getTranslation}
                showUnsavedReminder={
                  isExpanded && schedule.id === activeSchedule?.id && isActiveScheduleDirty
                }
                nameValue={draft.name}
                nameError={errors.name}
                onNameChange={(value) => {
                  setDraft((currentValue) => ({ ...currentValue, name: value }));
                }}
                weekdayOptions={currentWeekdayOptions}
                weekdayGroupKey={`${schedule.id}-${currentWeekdayOptions.map((option) => Number(option.default)).join("-")}`}
                weekdayGroupRef={weekdayGroupRef}
                onWeekdayChange={(value) => {
                  setDraft((currentValue) => ({ ...currentValue, days: value }));
                }}
                fromValue={draft.from}
                fromError={errors.from}
                onFromChange={(value) => {
                  setDraft((currentValue) => ({ ...currentValue, from: value }));
                }}
                toValue={draft.to}
                toError={errors.to}
                onToChange={(value) => {
                  setDraft((currentValue) => ({ ...currentValue, to: value }));
                }}
                popularSites={popularSites}
                onPopularSiteSelect={handlePopularSiteSelect}
                sitesValue={draft.sites}
                sitesListError={errors.sites}
                onSitesChange={(nextSites) => {
                  setDraft((currentValue) => ({ ...currentValue, sites: nextSites }));
                  setErrors((currentValue) => ({ ...currentValue, sites: undefined }));
                }}
                clearSitesListError={() => {
                  setErrors((currentValue) => ({ ...currentValue, sites: undefined }));
                }}
                isSiteEditable={(site) => !isPresetBackedScheduleSite(site)}
                onSubmit={() => {
                  void handleSubmit(schedule.id);
                }}
                submitDisabled={editSubmitDisabled}
                submitTooltip={editSubmitDisabled ? submitTooltip : undefined}
                onDelete={
                  canDelete
                    ? () => {
                        setDeleteTargetId(schedule.id);
                    }
                  : undefined
                }
                onClose={
                  canCollapse
                    ? () => {
                        setExpandedScheduleId(null);
                        setErrors({});
                    }
                  : undefined
                }
              />
            }
          />
        );
      })}

      <DeleteScheduleModal
        getTranslation={getTranslation}
        isOpen={deleteTargetId !== null}
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
