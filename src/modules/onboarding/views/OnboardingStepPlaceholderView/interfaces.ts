export type OnboardingStepPlaceholderViewProps = {
  title: string;
  description: string;
  note: string;
  previousActionLabel?: string;
  nextActionLabel: string;
  onPreviousAction?: () => void;
  onNextAction: () => void;
};
