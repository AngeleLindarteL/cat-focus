import type { ScheduleDays } from "@/lib/schedules";
import type { ScheduleSummaryProps } from "@/modules/schedule/views/ScheduleSummary/interfaces";

function summarizeDays(days: ScheduleDays): string {
  const enabledDays = Object.entries(days)
    .filter(([, enabled]) => enabled)
    .map(([key]) => key.slice(0, 3));

  return enabledDays.length ? enabledDays.join(", ") : "No days";
}

export function ScheduleSummary({
  name,
  days,
  from,
  to,
  sitesCount,
  sitesLabel,
}: ScheduleSummaryProps) {
  return (
    <div className="space-y-3">
      <div>
        <p className="text-base font-semibold text-stone-900">{name}</p>
        <p className="text-sm text-stone-500">{summarizeDays(days)}</p>
      </div>
      <div className="flex flex-wrap gap-3 text-sm text-stone-600">
        <span>{from}</span>
        <span>{to}</span>
        <span>
          {sitesCount} {sitesLabel}
        </span>
      </div>
    </div>
  );
}
