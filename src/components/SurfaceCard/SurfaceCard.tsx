import {
  SURFACE_CARD_CLASS_NAME,
  SURFACE_CARD_DESCRIPTION_CLASS_NAME,
  SURFACE_CARD_EYEBROW_CLASS_NAME,
  SURFACE_CARD_TITLE_CLASS_NAME,
} from "@/components/SurfaceCard/constants";
import type { SurfaceCardProps } from "@/components/SurfaceCard/interfaces";

export function SurfaceCard({
  eyebrow,
  title,
  description,
  footer,
  children,
}: SurfaceCardProps) {
  return (
    <section className={SURFACE_CARD_CLASS_NAME}>
      <p className={SURFACE_CARD_EYEBROW_CLASS_NAME}>{eyebrow}</p>
      <h1 className={SURFACE_CARD_TITLE_CLASS_NAME}>{title}</h1>
      <p className={SURFACE_CARD_DESCRIPTION_CLASS_NAME}>{description}</p>
      <div className="mt-6">{children}</div>
      {footer ? <div className="mt-6">{footer}</div> : null}
    </section>
  );
}
