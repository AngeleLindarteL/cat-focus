import type { ScheduleCardProps } from "@/modules/schedule/views/ScheduleCard/interfaces";

export function ScheduleCard({
  isExpanded,
  summary,
  expandedContent,
  onExpand,
  isHighlighted = false,
}: ScheduleCardProps) {
  return (
    <div
      data-highlighted={isHighlighted ? "true" : "false"}
      className={[
        "rounded-[30px] border bg-white p-5 shadow-[0_20px_60px_rgba(120,113,108,0.08)] transition",
        isHighlighted ? "border-amber-400 border-dashed" : "border-stone-200",
      ].join(" ")}
    >
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
