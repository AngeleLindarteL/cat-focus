export type StepperItem = {
  key: string;
  label: string;
  onClick?: () => void;
};

export type StepperProps = {
  steps: StepperItem[];
  actualStep: string;
};
