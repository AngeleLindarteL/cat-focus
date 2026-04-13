import type { CatColorSelectorProps } from "@/components/CatColorSelector/interfaces";

export function CatColorSelector({
  label,
  icon,
  error,
  className,
  ...inputProps
}: CatColorSelectorProps) {
  return (
    <label className="block space-y-2">
      <span className="flex items-center gap-3 text-sm font-medium text-stone-800">
        <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-stone-200 bg-stone-50 text-stone-700">
          {icon}
        </span>
        <span>{label}</span>
      </span>
      <input
        {...inputProps}
        type="color"
        className={[
          "h-12 w-full cursor-pointer rounded-2xl border border-stone-200 bg-white p-2",
          className ?? "",
        ].join(" ")}
      />
      {error ? <p className="text-sm text-red-700">{error}</p> : null}
    </label>
  );
}
