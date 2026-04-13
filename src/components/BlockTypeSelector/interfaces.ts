export type BlockTypeOption<TValue extends string> = {
  value: TValue;
  label: string;
  description: string;
};

export type BlockTypeSelectorProps<TValue extends string> = {
  value: TValue;
  options: BlockTypeOption<TValue>[];
  onChange: (value: TValue) => void;
  disabled?: boolean;
};
