export type ButtonTooltip = {
  whenDisabled?: string;
  whenEnabled?: string;
};

export type PrimaryButtonProps = {
  text: string;
  disabled?: boolean;
  tooltip?: ButtonTooltip;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
};
