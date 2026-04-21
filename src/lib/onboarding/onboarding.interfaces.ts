export type OnboardingStep = 1 | 2 | 3;

export type OnboardingState = {
  step: OnboardingStep;
  finished: boolean;
};

export type LegacyCatProfile = {
  name: string;
  furColorPrimary: string;
  furColorSecondary: string;
  eyeColor: string;
  tailColor: string;
};
