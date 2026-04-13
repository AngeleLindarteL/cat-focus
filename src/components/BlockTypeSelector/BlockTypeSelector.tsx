import type { BlockTypeSelectorProps } from "@/components/BlockTypeSelector/interfaces";

export function BlockTypeSelector<TValue extends string>({
  value,
  options,
  onChange,
  disabled = false,
}: BlockTypeSelectorProps<TValue>) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {options.map((option) => {
        const isSelected = option.value === value;

        return (
          <button
            key={option.value}
            type="button"
            disabled={disabled}
            onClick={() => {
              onChange(option.value);
            }}
            className={[
              "cursor-pointer rounded-3xl border px-4 py-4 text-left transition disabled:cursor-not-allowed",
              isSelected
                ? "border-amber-400 bg-amber-50 text-stone-900 shadow-sm"
                : "border-stone-200 bg-white text-stone-700 hover:border-amber-200 hover:bg-stone-50",
            ].join(" ")}
          >
            <span className="block text-sm font-semibold">{option.label}</span>
            <span className="mt-2 block text-sm leading-6 text-stone-500">
              {option.description}
            </span>
          </button>
        );
      })}
    </div>
  );
}
