export type StepperItem = {
  key: string;
  label: string;
};

export type StepperProps = {
  steps: StepperItem[];
  actualStep: string;
};
