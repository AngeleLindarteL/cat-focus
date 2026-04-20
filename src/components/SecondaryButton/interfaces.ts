import type { ButtonTooltip } from "@/components/PrimaryButton/interfaces";

export type SecondaryButtonProps = {
  text: string;
  disabled?: boolean;
  tooltip?: ButtonTooltip;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
};
