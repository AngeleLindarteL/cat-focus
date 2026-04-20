import { Tooltip } from "@/components/Tooltip";
import type { PrimaryButtonProps } from "@/components/PrimaryButton/interfaces";

export function PrimaryButton({
  text,
  disabled = false,
  tooltip,
  onClick,
  type = "button",
  className = "",
}: PrimaryButtonProps) {
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
          "inline-flex cursor-pointer items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold transition",
          disabled
            ? "cursor-not-allowed bg-stone-200 text-stone-400"
            : "bg-stone-900 text-stone-50 hover:bg-stone-700",
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
