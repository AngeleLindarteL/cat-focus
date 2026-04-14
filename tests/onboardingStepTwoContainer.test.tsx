import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { TranslationKey } from "@/lib/i18n";
import type { ScheduleRepository } from "@/lib/repositories/scheduleRepository";
import type { UsageRepository } from "@/lib/repositories/usageRepository";
import { OnboardingStepTwoContainer } from "@/modules/onboarding/containers/OnboardingStepTwoContainer";

function createScheduleRepository(): ScheduleRepository {
  let schedules = [] as Awaited<ReturnType<ScheduleRepository["findAll"]>>;

  return {
    findAll: async () => schedules,
    insertOne: async (schedule) => {
      const createdSchedule = {
        ...schedule,
        id: crypto.randomUUID(),
      };

      schedules = [...schedules, createdSchedule];

      return createdSchedule;
    },
    updateOneById: async (id, schedule) => {
      let updatedSchedule = null;

      schedules = schedules.map((currentSchedule) => {
        if (currentSchedule.id !== id) {
          return currentSchedule;
        }

        updatedSchedule = { ...schedule, id };
        return updatedSchedule;
      });

      return updatedSchedule;
    },
    deleteOneById: async (id) => {
      schedules = schedules.filter((schedule) => schedule.id !== id);
    },
  };
}

function getTranslation(key: string): string {
  const messages: Record<string, string> = {
    [TranslationKey.StepTwoTitle]: "Choose how you want to block distractions",
    [TranslationKey.StepTwoDescription]:
      "Choose at least one way to avoid distractions. You can edit it whenever you want.",
    [TranslationKey.StepTwoScheduleLabel]: "Schedule block",
    [TranslationKey.StepTwoScheduleDescription]: "Block during set hours",
    [TranslationKey.StepTwoUsageLabel]: "Usage time block",
    [TranslationKey.StepTwoUsageDescription]: "Block after time limits",
    [TranslationKey.StepTwoUsageConstruction]: "Coming soon",
    [TranslationKey.UsageEmptyTitle]: "No usage limits yet",
    [TranslationKey.UsageEmptyDescription]: "Create your first usage limit",
    [TranslationKey.UsageCreateFirst]: "Create first usage limit",
    [TranslationKey.UsageCreate]: "Create usage",
    [TranslationKey.UsageNameLabel]: "Usage name",
    [TranslationKey.UsageNamePlaceholder]: "Adult sites",
    [TranslationKey.UsageLimitLabel]: "Limit (Daily)",
    [TranslationKey.UsageLimitHoursLabel]: "Hours",
    [TranslationKey.UsageLimitMinutesLabel]: "Minutes",
    [TranslationKey.UsageSitesLabel]: "Sites",
    [TranslationKey.UsagePopularSitesTitle]: "Popular sites",
    [TranslationKey.UsageSiteNamePlaceholder]: "Site name",
    [TranslationKey.UsageSiteDomainPlaceholder]: "Site domain",
    [TranslationKey.UsageSiteAdd]: "Create",
    [TranslationKey.UsageSave]: "Save usage limit",
    [TranslationKey.UsageCreateSubmit]: "Create usage limit",
    [TranslationKey.UsageUpdateSubmit]: "Update usage limit",
    [TranslationKey.UsageUnsavedReminderTitle]: "You changed this usage limit.",
    [TranslationKey.UsageUnsavedReminderDescription]:
      "Press Save usage limit to keep your updates.",
    [TranslationKey.UsageEdit]: "Edit",
    [TranslationKey.UsageDelete]: "Delete",
    [TranslationKey.UsageClose]: "Close",
    [TranslationKey.UsageSiteCancelEdit]: "Cancel",
    [TranslationKey.UsageSiteDeleteAriaLabel]: "Delete site",
    [TranslationKey.UsageSummaryLimit]: "Daily limit",
    [TranslationKey.UsageSummarySites]: "sites",
    [TranslationKey.ValidationUsageNameRequired]: "Usage name is required",
    [TranslationKey.ValidationUsageNameMinLength]: "Usage name is too short",
    [TranslationKey.ValidationUsageHoursRequired]: "Hours are required",
    [TranslationKey.ValidationUsageHoursInvalid]: "Hours must be between 0 and 23",
    [TranslationKey.ValidationUsageMinutesRequired]: "Minutes are required",
    [TranslationKey.ValidationUsageMinutesInvalid]: "Minutes must be between 0 and 59",
    [TranslationKey.OnboardingBackAction]: "Back",
    [TranslationKey.OnboardingNextAction]: "Next",
    [TranslationKey.ScheduleEmptyTitle]: "No schedules yet",
    [TranslationKey.ScheduleEmptyDescription]: "Create your first schedule",
    [TranslationKey.ScheduleCreateFirst]: "Create first schedule",
    [TranslationKey.ScheduleCreate]: "Create",
    [TranslationKey.ScheduleNameLabel]: "Schedule name",
    [TranslationKey.ScheduleNamePlaceholder]: "Weekday focus",
    [TranslationKey.ScheduleDaysLabel]: "Days",
    [TranslationKey.ScheduleFromLabel]: "From",
    [TranslationKey.ScheduleToLabel]: "To",
    [TranslationKey.ScheduleSitesLabel]: "Sites",
    [TranslationKey.SchedulePopularSitesTitle]: "Popular sites",
    [TranslationKey.ScheduleSiteNamePlaceholder]: "Site name",
    [TranslationKey.ScheduleSiteDomainPlaceholder]: "Site domain",
    [TranslationKey.ScheduleSiteAdd]: "Create",
    [TranslationKey.ScheduleSave]: "Save",
    [TranslationKey.ScheduleCreateSubmit]: "Create schedule block",
    [TranslationKey.ScheduleUpdateSubmit]: "Update schedule block",
    [TranslationKey.ScheduleUnsavedReminderTitle]: "You changed this schedule.",
    [TranslationKey.ScheduleUnsavedReminderDescription]:
      "Press Save schedule to keep your updates.",
    [TranslationKey.ScheduleEdit]: "Edit",
    [TranslationKey.ScheduleDelete]: "Delete",
    [TranslationKey.ScheduleClose]: "Close",
    [TranslationKey.ValidationScheduleNameRequired]: "Name is required",
    [TranslationKey.ValidationScheduleNameMinLength]: "Name is too short",
    [TranslationKey.ValidationScheduleNameMaxLength]: "Name is too long",
    [TranslationKey.ValidationTimeRequired]: "Time is required",
    [TranslationKey.ValidationTimeRange]: "End time must be later",
    [TranslationKey.ValidationSitesRequired]: "At least one site is required",
    [TranslationKey.ValidationSiteNameRequired]: "Site name is required",
    [TranslationKey.ValidationDomainInvalid]: "Domain is invalid",
    [TranslationKey.FormSubmitDisabledNoChanges]: "There are no changes to save yet.",
    [TranslationKey.FormSubmitDisabledInvalid]:
      "Complete the form before saving your changes.",
    [TranslationKey.WeekdayMonday]: "Mon",
    [TranslationKey.WeekdayTuesday]: "Tue",
    [TranslationKey.WeekdayWednesday]: "Wed",
    [TranslationKey.WeekdayThursday]: "Thu",
    [TranslationKey.WeekdayFriday]: "Fri",
    [TranslationKey.WeekdaySaturday]: "Sat",
    [TranslationKey.WeekdaySunday]: "Sun",
  };

  return messages[key] ?? key;
}

function createUsageRepository(): UsageRepository {
  let usageBlocks = [] as Awaited<ReturnType<UsageRepository["findAll"]>>;

  return {
    findAll: async () => usageBlocks,
    insertOne: async (block) => {
      const createdBlock = {
        ...block,
        id: crypto.randomUUID(),
      };

      usageBlocks = [...usageBlocks, createdBlock];

      return createdBlock;
    },
    updateOneById: async (id, block) => {
      let updatedBlock = null;

      usageBlocks = usageBlocks.map((currentBlock) => {
        if (currentBlock.id !== id) {
          return currentBlock;
        }

        updatedBlock = { ...block, id };
        return updatedBlock;
      });

      return updatedBlock;
    },
    deleteOneById: async (id) => {
      usageBlocks = usageBlocks.filter((block) => block.id !== id);
    },
  };
}

describe("OnboardingStepTwoContainer", () => {
  it("disables the step 2 next action when no schedule exists", async () => {
    render(
      <OnboardingStepTwoContainer
        scheduleRepository={createScheduleRepository()}
        usageRepository={createUsageRepository()}
        getTranslation={getTranslation}
        isPreviousActionDisabled={false}
        isNextActionDisabled
        onCanContinueToStepThreeChange={vi.fn()}
        onHasBlockingUnsavedChangesChange={vi.fn()}
        onPreviousAction={vi.fn()}
        onNextAction={vi.fn()}
      />,
    );

    expect(
      await screen.findByRole("button", { name: "Next" }),
    ).toBeDisabled();
  });

  it("enables the step 2 next action after the first schedule block is created", async () => {
    const onCanContinueToStepThreeChange = vi.fn();
    const onNextAction = vi.fn();

    render(
      <OnboardingStepTwoContainer
        scheduleRepository={createScheduleRepository()}
        usageRepository={createUsageRepository()}
        getTranslation={getTranslation}
        isPreviousActionDisabled={false}
        isNextActionDisabled={false}
        onCanContinueToStepThreeChange={onCanContinueToStepThreeChange}
        onHasBlockingUnsavedChangesChange={vi.fn()}
        onPreviousAction={vi.fn()}
        onNextAction={onNextAction}
      />,
    );

    expect(onCanContinueToStepThreeChange).toHaveBeenCalledWith(false);

    fireEvent.click(await screen.findByRole("button", { name: "Create first schedule" }));
    fireEvent.change(screen.getByLabelText("Schedule name"), {
      target: { value: "Weekday focus" },
    });
    fireEvent.change(screen.getByPlaceholderText("Site name"), {
      target: { value: "X" },
    });
    fireEvent.change(screen.getByPlaceholderText("Site domain"), {
      target: { value: "https://www.x.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Create" }));
    fireEvent.click(screen.getByRole("button", { name: "Create schedule block" }));

    await waitFor(() => {
      expect(onCanContinueToStepThreeChange).toHaveBeenLastCalledWith(true);
    });

    fireEvent.click(screen.getByRole("button", { name: "Next" }));

    expect(onNextAction).toHaveBeenCalled();
  });

  it("shows a reminder when an existing schedule changes", async () => {
    const scheduleRepository = createScheduleRepository();

    await scheduleRepository.insertOne({
      name: "Weekday focus",
      schedule: {
        days: {
          monday: true,
          tuesday: true,
          wednesday: true,
          thursday: true,
          friday: true,
          saturday: false,
          sunday: false,
        },
        time: {
          from: "06:00",
          to: "18:00",
        },
      },
      sites: [{ name: "X", domain: "x.com" }],
    });

    render(
      <OnboardingStepTwoContainer
        scheduleRepository={scheduleRepository}
        usageRepository={createUsageRepository()}
        getTranslation={getTranslation}
        isPreviousActionDisabled={false}
        isNextActionDisabled={false}
        onCanContinueToStepThreeChange={vi.fn()}
        onHasBlockingUnsavedChangesChange={vi.fn()}
        onPreviousAction={vi.fn()}
        onNextAction={vi.fn()}
      />,
    );

    expect(await screen.findByDisplayValue("Weekday focus")).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText("Schedule name"), {
      target: { value: "Weekday focus updated" },
    });

    expect(screen.getByText("You changed this schedule.")).toBeInTheDocument();
    expect(
      screen.getByText("Press Save schedule to keep your updates."),
    ).toBeInTheDocument();

    const reminder = screen.getByText("You changed this schedule.");
    const highlightedCard = reminder.closest("[data-highlighted]");

    expect(highlightedCard?.className).toContain("border-dashed");
    expect(highlightedCard?.className).toContain("border-amber-400");
    expect(highlightedCard).toHaveAttribute("data-highlighted", "true");
  });

  it("rejects 2-character schedule names through disabled submit and accepts 3-character names", async () => {
    render(
      <OnboardingStepTwoContainer
        scheduleRepository={createScheduleRepository()}
        usageRepository={createUsageRepository()}
        getTranslation={getTranslation}
        isPreviousActionDisabled={false}
        isNextActionDisabled={false}
        onCanContinueToStepThreeChange={vi.fn()}
        onHasBlockingUnsavedChangesChange={vi.fn()}
        onPreviousAction={vi.fn()}
        onNextAction={vi.fn()}
      />,
    );

    fireEvent.click(await screen.findByRole("button", { name: "Create first schedule" }));
    fireEvent.change(screen.getByLabelText("Schedule name"), {
      target: { value: "AB" },
    });
    fireEvent.change(screen.getByPlaceholderText("Site name"), {
      target: { value: "X" },
    });
    fireEvent.change(screen.getByPlaceholderText("Site domain"), {
      target: { value: "x.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Create" }));
    const submitButton = screen.getByRole("button", {
      name: "Create schedule block",
    });

    expect(submitButton).toBeDisabled();
    expect(submitButton.parentElement).toHaveAttribute(
      "title",
      "Complete the form before saving your changes.",
    );

    fireEvent.change(screen.getByPlaceholderText("Weekday focus"), {
      target: { value: "ABC" },
    });

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: "Create schedule block" }),
      ).toBeEnabled();
      expect(screen.getByRole("button", { name: "Next" })).toBeEnabled();
    });
  });

  it("enables the step 2 next action after the first usage block is created", async () => {
    const onCanContinueToStepThreeChange = vi.fn();
    const onNextAction = vi.fn();

    render(
      <OnboardingStepTwoContainer
        scheduleRepository={createScheduleRepository()}
        usageRepository={createUsageRepository()}
        getTranslation={getTranslation}
        isPreviousActionDisabled={false}
        isNextActionDisabled={false}
        onCanContinueToStepThreeChange={onCanContinueToStepThreeChange}
        onHasBlockingUnsavedChangesChange={vi.fn()}
        onPreviousAction={vi.fn()}
        onNextAction={onNextAction}
      />,
    );

    fireEvent.click(
      await screen.findByRole("button", { name: /Usage time block/ }),
    );
    fireEvent.click(await screen.findByRole("button", { name: "Create first usage limit" }));
    fireEvent.change(screen.getByLabelText("Usage name"), {
      target: { value: "Adult sites" },
    });
    fireEvent.change(screen.getByLabelText("Hours"), {
      target: { value: "1" },
    });
    fireEvent.change(screen.getByLabelText("Minutes"), {
      target: { value: "0" },
    });
    fireEvent.change(screen.getByPlaceholderText("Site name"), {
      target: { value: "Instagram" },
    });
    fireEvent.change(screen.getByPlaceholderText("Site domain"), {
      target: { value: "https://www.instagram.com/reels" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Create" }));
    fireEvent.click(screen.getByRole("button", { name: "Create usage limit" }));

    await waitFor(() => {
      expect(onCanContinueToStepThreeChange).toHaveBeenLastCalledWith(true);
    });

    fireEvent.click(screen.getByRole("button", { name: "Next" }));

    expect(onNextAction).toHaveBeenCalled();
  });

  it("locks back and next while an existing schedule edit is dirty", async () => {
    const scheduleRepository = createScheduleRepository();
    const onHasBlockingUnsavedChangesChange = vi.fn();

    await scheduleRepository.insertOne({
      name: "Weekday focus",
      schedule: {
        days: {
          monday: true,
          tuesday: true,
          wednesday: true,
          thursday: true,
          friday: true,
          saturday: false,
          sunday: false,
        },
        time: {
          from: "06:00",
          to: "18:00",
        },
      },
      sites: [{ name: "X", domain: "x.com" }],
    });

    render(
      <OnboardingStepTwoContainer
        scheduleRepository={scheduleRepository}
        usageRepository={createUsageRepository()}
        getTranslation={getTranslation}
        isPreviousActionDisabled={false}
        isNextActionDisabled={false}
        onCanContinueToStepThreeChange={vi.fn()}
        onHasBlockingUnsavedChangesChange={onHasBlockingUnsavedChangesChange}
        onPreviousAction={vi.fn()}
        onNextAction={vi.fn()}
      />,
    );

    fireEvent.change(await screen.findByLabelText("Schedule name"), {
      target: { value: "Weekday focus updated" },
    });

    await waitFor(() => {
      expect(onHasBlockingUnsavedChangesChange).toHaveBeenLastCalledWith(true);
      expect(
        screen.getByRole("button", { name: /Usage time block/ }),
      ).toBeDisabled();
    });
  });

  it("shows the unsaved reminder for a dirty usage create draft", async () => {
    render(
      <OnboardingStepTwoContainer
        scheduleRepository={createScheduleRepository()}
        usageRepository={createUsageRepository()}
        getTranslation={getTranslation}
        isPreviousActionDisabled={false}
        isNextActionDisabled={false}
        onCanContinueToStepThreeChange={vi.fn()}
        onHasBlockingUnsavedChangesChange={vi.fn()}
        onPreviousAction={vi.fn()}
        onNextAction={vi.fn()}
      />,
    );

    fireEvent.click(
      await screen.findByRole("button", { name: /Usage time block/ }),
    );
    fireEvent.click(
      await screen.findByRole("button", { name: "Create first usage limit" }),
    );
    fireEvent.change(screen.getByLabelText("Usage name"), {
      target: { value: "Adult sites updated" },
    });

    expect(
      screen.getByText("You changed this usage limit."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Press Save usage limit to keep your updates."),
    ).toBeInTheDocument();
  });

  it("renders separate usage daily limit inputs for hours and minutes", async () => {
    render(
      <OnboardingStepTwoContainer
        scheduleRepository={createScheduleRepository()}
        usageRepository={createUsageRepository()}
        getTranslation={getTranslation}
        isPreviousActionDisabled={false}
        isNextActionDisabled={false}
        onCanContinueToStepThreeChange={vi.fn()}
        onHasBlockingUnsavedChangesChange={vi.fn()}
        onPreviousAction={vi.fn()}
        onNextAction={vi.fn()}
      />,
    );

    fireEvent.click(
      await screen.findByRole("button", { name: /Usage time block/ }),
    );
    fireEvent.click(
      await screen.findByRole("button", { name: "Create first usage limit" }),
    );

    expect(screen.getByLabelText("Hours")).toBeInTheDocument();
    expect(screen.getByLabelText("Minutes")).toBeInTheDocument();
  });

  it("validates usage hours and minutes separately through the disabled submit state", async () => {
    render(
      <OnboardingStepTwoContainer
        scheduleRepository={createScheduleRepository()}
        usageRepository={createUsageRepository()}
        getTranslation={getTranslation}
        isPreviousActionDisabled={false}
        isNextActionDisabled={false}
        onCanContinueToStepThreeChange={vi.fn()}
        onHasBlockingUnsavedChangesChange={vi.fn()}
        onPreviousAction={vi.fn()}
        onNextAction={vi.fn()}
      />,
    );

    fireEvent.click(
      await screen.findByRole("button", { name: /Usage time block/ }),
    );
    fireEvent.click(
      await screen.findByRole("button", { name: "Create first usage limit" }),
    );
    fireEvent.change(screen.getByLabelText("Usage name"), {
      target: { value: "Adult sites" },
    });
    fireEvent.change(screen.getByLabelText("Hours"), {
      target: { value: "24" },
    });
    fireEvent.change(screen.getByLabelText("Minutes"), {
      target: { value: "60" },
    });
    fireEvent.change(screen.getByPlaceholderText("Site name"), {
      target: { value: "Instagram" },
    });
    fireEvent.change(screen.getByPlaceholderText("Site domain"), {
      target: { value: "instagram.com" },
    });
    const submitButton = screen.getByRole("button", {
      name: "Create usage limit",
    });

    expect(submitButton).toBeDisabled();
    expect(submitButton.parentElement).toHaveAttribute(
      "title",
      "Complete the form before saving your changes.",
    );
  });

  it("disables schedule update when there are no changes and exposes the tooltip reason", async () => {
    const scheduleRepository = createScheduleRepository();

    await scheduleRepository.insertOne({
      name: "Weekday focus",
      schedule: {
        days: {
          monday: true,
          tuesday: true,
          wednesday: true,
          thursday: true,
          friday: true,
          saturday: false,
          sunday: false,
        },
        time: {
          from: "06:00",
          to: "18:00",
        },
      },
      sites: [{ name: "X", domain: "x.com" }],
    });

    render(
      <OnboardingStepTwoContainer
        scheduleRepository={scheduleRepository}
        usageRepository={createUsageRepository()}
        getTranslation={getTranslation}
        isPreviousActionDisabled={false}
        isNextActionDisabled={false}
        onCanContinueToStepThreeChange={vi.fn()}
        onHasBlockingUnsavedChangesChange={vi.fn()}
        onPreviousAction={vi.fn()}
        onNextAction={vi.fn()}
      />,
    );

    const submitButton = await screen.findByRole("button", {
      name: "Update schedule block",
    });

    expect(submitButton).toBeDisabled();
    expect(submitButton.parentElement).toHaveAttribute(
      "title",
      "There are no changes to save yet.",
    );
  });

  it("disables usage update when the edited form is invalid and exposes the tooltip reason", async () => {
    const usageRepository = createUsageRepository();

    await usageRepository.insertOne({
      name: "Adult sites",
      limit: {
        time: "01:00",
        resetsAt: "00:00",
      },
      sites: [{ name: "Instagram", domain: "instagram.com" }],
    });

    render(
      <OnboardingStepTwoContainer
        scheduleRepository={createScheduleRepository()}
        usageRepository={usageRepository}
        getTranslation={getTranslation}
        isPreviousActionDisabled={false}
        isNextActionDisabled={false}
        onCanContinueToStepThreeChange={vi.fn()}
        onHasBlockingUnsavedChangesChange={vi.fn()}
        onPreviousAction={vi.fn()}
        onNextAction={vi.fn()}
      />,
    );

    fireEvent.click(
      await screen.findByRole("button", { name: /Usage time block/ }),
    );
    fireEvent.change(await screen.findByLabelText("Hours"), {
      target: { value: "99" },
    });

    const submitButton = screen.getByRole("button", { name: "Update usage limit" });

    expect(submitButton).toBeDisabled();
    expect(submitButton.parentElement).toHaveAttribute(
      "title",
      "Complete the form before saving your changes.",
    );
  });
});
