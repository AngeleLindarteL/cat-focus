export type HomeViewProps = {
  surface?: "options" | "popup";
  eyebrow: string;
  title: string;
  description: string;
  body: string;
  primaryActionLabel?: string;
  onPrimaryAction?: () => void;
  secondaryText?: string;
};
