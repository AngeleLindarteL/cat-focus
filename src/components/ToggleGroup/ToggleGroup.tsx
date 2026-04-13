import {
  forwardRef,
  useImperativeHandle,
  useState,
  type ForwardedRef,
  type ReactElement,
} from "react";
import type {
  ToggleGroupProps,
  ToggleGroupRef,
  ToggleGroupValue,
} from "@/components/ToggleGroup/interfaces";

function createInitialValue<TKey extends string>(
  options: ToggleGroupProps<TKey>["options"],
): ToggleGroupValue<TKey> {
  return options.reduce<ToggleGroupValue<TKey>>(
    (result, option) => ({
      ...result,
      [option.key]: option.default ?? false,
    }),
    {} as ToggleGroupValue<TKey>,
  );
}

export const ToggleGroup = forwardRef(function ToggleGroup<TKey extends string>(
  { options, label, disabled = false }: ToggleGroupProps<TKey>,
  ref: ForwardedRef<ToggleGroupRef<TKey>>,
) {
  const [value, setValue] = useState<ToggleGroupValue<TKey>>(() =>
    createInitialValue(options),
  );

  useImperativeHandle(
    ref,
    () => ({
      value,
    }),
    [value],
  );

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-stone-800">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isActive = value[option.key];

          return (
            <button
              key={option.key}
              type="button"
              disabled={disabled}
              onClick={() => {
                setValue((currentValue) => ({
                  ...currentValue,
                  [option.key]: !currentValue[option.key],
                }));
              }}
              className={[
                "cursor-pointer rounded-2xl border px-3 py-2 text-sm font-medium transition disabled:cursor-not-allowed",
                isActive
                  ? "border-stone-900 bg-stone-900 text-white"
                  : "border-stone-200 bg-white text-stone-700 hover:border-amber-300",
              ].join(" ")}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}) as <TKey extends string>(
  props: ToggleGroupProps<TKey> & {
    ref?: ForwardedRef<ToggleGroupRef<TKey>>;
  },
) => ReactElement;
