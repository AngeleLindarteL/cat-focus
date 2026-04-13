import type { ScheduleCardProps } from "@/modules/schedule/views/ScheduleCard/interfaces";

export function ScheduleCard({
  isExpanded,
  summary,
  expandedContent,
  onExpand,
}: ScheduleCardProps) {
  return (
    <div className="rounded-[30px] border border-stone-200 bg-white p-5 shadow-[0_20px_60px_rgba(120,113,108,0.08)]">
      {isExpanded ? (
        expandedContent
      ) : (
        <button
          type="button"
          onClick={onExpand}
          className="block w-full cursor-pointer text-left"
        >
          {summary}
        </button>
      )}
    </div>
  );
}
