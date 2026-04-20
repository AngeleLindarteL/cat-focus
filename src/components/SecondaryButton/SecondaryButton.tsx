import { Tooltip } from "@/components/Tooltip";
import type { SecondaryButtonProps } from "@/components/SecondaryButton/interfaces";

export function SecondaryButton({
  text,
  disabled = false,
  tooltip,
  onClick,
  type = "button",
  className = "",
}: SecondaryButtonProps) {
  const tooltipText = disabled
    ? (tooltip?.whenDisabled ?? "")
    : (tooltip?.whenEnabled ?? "");
  const hasTooltip = tooltipText.trim().length > 0;

  return (
    <Tooltip position="above" text={tooltipText} disabled={!hasTooltip}>
      <button
        type={type}
        disabled={disabled}
        onClick={onClick}
        className={[
          "inline-flex cursor-pointer items-center justify-center rounded-2xl border px-4 py-3 text-sm font-semibold transition",
          disabled
            ? "cursor-not-allowed border-stone-200 bg-white text-stone-300"
            : "border-stone-200 bg-white text-stone-700 hover:border-stone-300 hover:bg-stone-50",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {text}
      </button>
    </Tooltip>
  );
}
