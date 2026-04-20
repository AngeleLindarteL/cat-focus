import { useCallback, useEffect, useMemo, useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { catToast } from "@/components/Toast";
import {
  createPopularSitePresetItems,
  isPopularSitePresetSite,
  togglePopularSitePreset,
  type PopularSitePresetItem,
} from "@/lib/blockedSites";
import { TranslationKey, type UseTranslationResult } from "@/lib/i18n";
import type { UsageRepository } from "@/lib/repositories/usageRepository";
import { usageRepository as defaultUsageRepository } from "@/lib/repositories/usageRepository";
import type { UsageBlock } from "@/lib/usage";
import { DeleteUsageModal } from "@/modules/usage/components/DeleteUsageModal";
import {
  areUsageBlockDraftsEqual,
  createDefaultUsageValues,
  createUsageBlockDraft,
  createUsageFormValuesFromDraft,
  type UsageBlockFormErrors,
  type UsageBlockFormValues,
  validateUsageBlockForm,
} from "@/modules/usage/services/usageBlockForm";
import { UsageCard } from "@/modules/usage/views/UsageCard";
import { UsageEmptyState } from "@/modules/usage/views/UsageEmptyState";
import { UsageBlockForm } from "@/modules/usage/views/UsageBlockForm";
import { UsageSummary } from "@/modules/usage/views/UsageSummary";

type UsageBlockContainerProps = {
  isOnboarding: boolean;
  getTranslation: UseTranslationResult["getTranslation"];
  repository?: UsageRepository;
  onUsageBlocksChange?: (blocks: UsageBlock[]) => void;
  onHasBlockingUnsavedChangesChange?: (hasUnsavedChanges: boolean) => void;
};

export function UsageBlockContainer({
  isOnboarding,
  getTranslation,
  repository = defaultUsageRepository,
  onUsageBlocksChange,
  onHasBlockingUnsavedChangesChange,
}: UsageBlockContainerProps) {
  const [blocks, setBlocks] = useState<UsageBlock[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedBlockId, setExpandedBlockId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [draft, setDraft] = useState<UsageBlockFormValues>(createDefaultUsageValues);
  const [errors, setErrors] = useState<UsageBlockFormErrors>({});
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [cardsRef] = useAutoAnimate<HTMLDivElement>();

  const refresh = useCallback(async () => {
    setIsLoading(true);
    const storedBlocks = await repository.findAll();
    setBlocks(storedBlocks);
    onUsageBlocksChange?.(storedBlocks);

    if (isOnboarding && storedBlocks.length === 0) {
      setExpandedBlockId(null);
      setIsCreating(false);
    }

    setIsLoading(false);
  }, [repository, isOnboarding, onUsageBlocksChange]);

  useEffect(() => {
    let isMounted = true;

    void repository.findAll().then((storedBlocks) => {
      if (!isMounted) {
        return;
      }

      setBlocks(storedBlocks);
      onUsageBlocksChange?.(storedBlocks);

      if (isOnboarding) {
        if (storedBlocks.length > 0) {
          setExpandedBlockId(storedBlocks[0].id);
          setIsCreating(false);
          setDraft(createUsageFormValuesFromDraft(storedBlocks[0]));
        } else {
          setExpandedBlockId(null);
        }
      }

      setIsLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, [repository, isOnboarding, onUsageBlocksChange]);

  const popularSites = useMemo(
    () => createPopularSitePresetItems(draft.sites),
    [draft.sites],
  );
  const validationMessages = useMemo(
    () => ({
      nameRequired: getTranslation(TranslationKey.ValidationUsageNameRequired),
      nameMinLength: getTranslation(
        TranslationKey.ValidationUsageNameMinLength,
      ),
      hoursRequired: getTranslation(TranslationKey.ValidationUsageHoursRequired),
      hoursInvalid: getTranslation(TranslationKey.ValidationUsageHoursInvalid),
      minutesRequired: getTranslation(
        TranslationKey.ValidationUsageMinutesRequired,
      ),
      minutesInvalid: getTranslation(
        TranslationKey.ValidationUsageMinutesInvalid,
      ),
      sitesRequired: getTranslation(TranslationKey.ValidationSitesRequired),
      siteNameRequired: getTranslation(
        TranslationKey.ValidationSiteNameRequired,
      ),
      domainInvalid: getTranslation(TranslationKey.ValidationDomainInvalid),
    }),
    [getTranslation],
  );

  function handlePopularSiteSelect(item: PopularSitePresetItem) {
    setDraft((currentValue) => ({
      ...currentValue,
      sites: togglePopularSitePreset(currentValue.sites, item),
    }));
    setErrors((currentValue) => ({ ...currentValue, sites: undefined }));
  }

  function openCreateForm() {
    setDraft(createDefaultUsageValues());
    setErrors({});
    setExpandedBlockId(null);
    setIsCreating(true);
  }

  function openEditForm(block: UsageBlock) {
    setDraft(createUsageFormValuesFromDraft(block));
    setErrors({});
    setExpandedBlockId(block.id);
    setIsCreating(false);
  }

  async function handleSubmit(activeBlockId: string | null) {
    const nextValues: UsageBlockFormValues = {
      ...draft,
    };
    const nextErrors = validateUsageBlockForm(nextValues, validationMessages);

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    if (isOnboarding && blocks.length > 0 && !activeBlockId) {
      return;
    }

    const nextDraft = createUsageBlockDraft(nextValues);

    if (activeBlockId) {
      await repository.updateOneById(activeBlockId, nextDraft);
    } else {
      const createdBlock = await repository.insertOne(nextDraft);
      if (!isOnboarding) {
        setExpandedBlockId(createdBlock.id);
      } else {
        setDraft(createDefaultUsageValues());
      }
      setIsCreating(false);
    }

    await refresh();
    if (activeBlockId) {
      catToast.success(getTranslation(TranslationKey.ToastUsageUpdated));
    } else {
      catToast.success(getTranslation(TranslationKey.ToastUsageCreated));
    }
  }

  async function handleDelete() {
    if (!deleteTargetId) {
      return;
    }

    await repository.deleteOneById(deleteTargetId);
    setDeleteTargetId(null);
    setExpandedBlockId(null);
    setDraft(createDefaultUsageValues());
    await refresh();
    catToast.success(getTranslation(TranslationKey.ToastUsageDeleted));
  }

  const activeBlock = blocks.find((block) => block.id === expandedBlockId) ?? null;
  const showEmptyState = !isLoading && blocks.length === 0 && !isCreating;
  const canCollapse = !isOnboarding;
  const canDelete = !isOnboarding && !!activeBlock;
  const renderCreateForm = isCreating && (!isOnboarding || blocks.length === 0);
  const defaultCreateDraft = createUsageBlockDraft(createDefaultUsageValues());
  const currentCreateDraft = createUsageBlockDraft(draft);
  const isCreateDirty =
    isCreating && !areUsageBlockDraftsEqual(currentCreateDraft, defaultCreateDraft);
  const activeBlockDraft = activeBlock ? createUsageBlockDraft(draft) : null;
  const persistedActiveBlockDraft = activeBlock
    ? createUsageBlockDraft(createUsageFormValuesFromDraft(activeBlock))
    : null;
  const isActiveBlockDirty =
    !!activeBlock &&
    !!activeBlockDraft &&
    !!persistedActiveBlockDraft &&
    !areUsageBlockDraftsEqual(activeBlockDraft, persistedActiveBlockDraft);
  const hasBlockingUnsavedChanges = isCreateDirty || isActiveBlockDirty;
  const draftValidationErrors = useMemo(
    () => validateUsageBlockForm(draft, validationMessages),
    [draft, validationMessages],
  );
  const hasDraftValidationErrors =
    Object.keys(draftValidationErrors).length > 0;
  const createSubmitDisabled = !isCreateDirty || hasDraftValidationErrors;
  const editSubmitDisabled = !isActiveBlockDirty || hasDraftValidationErrors;
  const submitTooltip = !hasDraftValidationErrors
    ? getTranslation(TranslationKey.FormSubmitDisabledNoChanges)
    : getTranslation(TranslationKey.FormSubmitDisabledInvalid);

  useEffect(() => {
    onHasBlockingUnsavedChangesChange?.(hasBlockingUnsavedChanges);
  }, [hasBlockingUnsavedChanges, onHasBlockingUnsavedChangesChange]);

  return (
    <div ref={cardsRef} className="space-y-4">
      {!isOnboarding && blocks.length > 0 ? (
        <div className="flex justify-end">
          <button
            type="button"
            onClick={openCreateForm}
            className="cursor-pointer rounded-2xl bg-stone-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-stone-700"
          >
            {getTranslation(TranslationKey.UsageCreate)}
          </button>
        </div>
      ) : null}

      {showEmptyState ? (
        <UsageEmptyState
          getTranslation={getTranslation}
          onAction={openCreateForm}
        />
      ) : null}

      {renderCreateForm ? (
        <UsageCard
          isExpanded
          isHighlighted={isCreateDirty}
          onExpand={() => undefined}
          summary={null}
          expandedContent={
            <UsageBlockForm
              mode="create"
              getTranslation={getTranslation}
              showUnsavedReminder={isCreateDirty}
              nameValue={draft.name}
              nameError={errors.name}
              onNameChange={(value) => {
                setDraft((currentValue) => ({ ...currentValue, name: value }));
              }}
              limitHoursValue={draft.limitHours}
              limitHoursError={errors.limitHours}
              onLimitHoursChange={(value) => {
                setDraft((currentValue) => ({
                  ...currentValue,
                  limitHours: value,
                }));
              }}
              limitMinutesValue={draft.limitMinutes}
              limitMinutesError={errors.limitMinutes}
              onLimitMinutesChange={(value) => {
                setDraft((currentValue) => ({
                  ...currentValue,
                  limitMinutes: value,
                }));
              }}
              popularSites={popularSites}
              onPopularSiteSelect={handlePopularSiteSelect}
              sitesValue={draft.sites}
              sitesListError={errors.sites}
              onSitesChange={(nextSites) => {
                setDraft((currentValue) => ({
                  ...currentValue,
                  sites: nextSites,
                }));
                setErrors((currentValue) => ({
                  ...currentValue,
                  sites: undefined,
                }));
              }}
              clearSitesListError={() => {
                setErrors((currentValue) => ({
                  ...currentValue,
                  sites: undefined,
                }));
              }}
              isSiteEditable={(site) => !isPopularSitePresetSite(site)}
              onSubmit={() => {
                void handleSubmit(null);
              }}
              submitDisabled={createSubmitDisabled}
              submitTooltip={createSubmitDisabled ? submitTooltip : undefined}
              onClose={
                canCollapse
                  ? () => {
                      setIsCreating(false);
                      setErrors({});
                      setDraft(createDefaultUsageValues());
                    }
                  : undefined
              }
            />
          }
        />
      ) : null}

      {blocks.map((block) => {
        const isExpanded = block.id === expandedBlockId;

        return (
          <UsageCard
            key={block.id}
            isExpanded={isExpanded}
            isHighlighted={isExpanded && block.id === activeBlock?.id && isActiveBlockDirty}
            onExpand={() => {
              openEditForm(block);
            }}
            summary={
              <UsageSummary
                getTranslation={getTranslation}
                name={block.name}
                limitTime={block.limit.time}
                sitesCount={block.sites.length}
              />
            }
            expandedContent={
              <UsageBlockForm
                mode="edit"
                getTranslation={getTranslation}
                showUnsavedReminder={
                  isExpanded && block.id === activeBlock?.id && isActiveBlockDirty
                }
                nameValue={draft.name}
                nameError={errors.name}
                onNameChange={(value) => {
                  setDraft((currentValue) => ({ ...currentValue, name: value }));
                }}
                limitHoursValue={draft.limitHours}
                limitHoursError={errors.limitHours}
                onLimitHoursChange={(value) => {
                  setDraft((currentValue) => ({
                    ...currentValue,
                    limitHours: value,
                  }));
                }}
                limitMinutesValue={draft.limitMinutes}
                limitMinutesError={errors.limitMinutes}
                onLimitMinutesChange={(value) => {
                  setDraft((currentValue) => ({
                    ...currentValue,
                    limitMinutes: value,
                  }));
                }}
                popularSites={popularSites}
                onPopularSiteSelect={handlePopularSiteSelect}
                sitesValue={draft.sites}
                sitesListError={errors.sites}
                onSitesChange={(nextSites) => {
                  setDraft((currentValue) => ({
                    ...currentValue,
                    sites: nextSites,
                  }));
                  setErrors((currentValue) => ({
                    ...currentValue,
                    sites: undefined,
                  }));
                }}
                clearSitesListError={() => {
                  setErrors((currentValue) => ({
                    ...currentValue,
                    sites: undefined,
                  }));
                }}
                isSiteEditable={(site) => !isPopularSitePresetSite(site)}
                onSubmit={() => {
                  void handleSubmit(block.id);
                }}
                submitDisabled={editSubmitDisabled}
                submitTooltip={editSubmitDisabled ? submitTooltip : undefined}
                onDelete={
                  canDelete
                    ? () => {
                        setDeleteTargetId(block.id);
                      }
                    : undefined
                }
                onClose={
                  canCollapse
                    ? () => {
                        setExpandedBlockId(null);
                        setErrors({});
                    }
                    : undefined
                }
              />
            }
          />
        );
      })}

      <DeleteUsageModal
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
