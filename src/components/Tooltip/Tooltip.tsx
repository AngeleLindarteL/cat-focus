import { useEffect, useRef, useState } from "react";
import type { TooltipProps } from "@/components/Tooltip/interfaces";
import {
  TOOLTIP_ANIMATION_MS,
  TOOLTIP_POSITION_CLASSNAME,
} from "@/components/Tooltip/constants";

export function Tooltip({ position, text, disabled, children }: TooltipProps) {
  const shouldRenderTooltip = !disabled && text.trim().length > 0;
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const hideTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (hideTimeoutRef.current !== null) {
        window.clearTimeout(hideTimeoutRef.current);
      }
    };
  }, []);

  const showTooltip = () => {
    if (!shouldRenderTooltip) {
      return;
    }

    if (hideTimeoutRef.current !== null) {
      window.clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }

    setIsMounted(true);
    window.requestAnimationFrame(() => {
      setIsVisible(true);
    });
  };

  const hideTooltip = () => {
    setIsVisible(false);

    if (hideTimeoutRef.current !== null) {
      window.clearTimeout(hideTimeoutRef.current);
    }

    hideTimeoutRef.current = window.setTimeout(() => {
      setIsMounted(false);
    }, TOOLTIP_ANIMATION_MS);
  };

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={(event) => {
        if (event.currentTarget.contains(event.relatedTarget as Node | null)) {
          return;
        }

        hideTooltip();
      }}
    >
      {children}
      {shouldRenderTooltip && isMounted ? (
        <span
          role="tooltip"
          className={`pointer-events-none absolute z-20 ${TOOLTIP_POSITION_CLASSNAME[position]}`}
        >
          <span
            className={`inline-flex w-max max-w-64 items-center gap-2 rounded-2xl border border-stone-200 bg-white px-3 py-2 text-xs font-medium leading-5 text-stone-700 shadow-[0_16px_40px_rgba(120,113,108,0.16)] transition duration-200 ease-out ${
              isVisible
                ? "translate-x-0 translate-y-0 opacity-100"
                : position === "above"
                  ? "translate-y-2 opacity-0"
                  : position === "below"
                    ? "-translate-y-2 opacity-0"
                    : position === "left"
                      ? "translate-x-2 opacity-0"
                      : "-translate-x-2 opacity-0"
            }`}
          >
            <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-100 text-[0.7rem] font-semibold text-amber-700">
              ?
            </span>
            <span>{text}</span>
          </span>
        </span>
      ) : null}
    </span>
  );
}
