import { z } from "zod";

export function sanitizeCatName(value: string): string {
  return value.trim().replace(/\s+/g, " ");
}

export function createCatProfileSchema(messages: {
  nameRequired: string;
  nameMinLength: string;
  nameMaxLength: string;
  colorInvalid: string;
}) {
  return z.object({
    name: z
      .string()
      .transform(sanitizeCatName)
      .pipe(
        z
          .string()
          .min(1, messages.nameRequired)
          .min(3, messages.nameMinLength)
          .max(32, messages.nameMaxLength),
      ),
    furColorPrimary: z
      .string()
      .regex(/^#[0-9a-fA-F]{6}$/, messages.colorInvalid),
    furColorSecondary: z
      .string()
      .regex(/^#[0-9a-fA-F]{6}$/, messages.colorInvalid),
    eyeColor: z.string().regex(/^#[0-9a-fA-F]{6}$/, messages.colorInvalid),
    tailColor: z.string().regex(/^#[0-9a-fA-F]{6}$/, messages.colorInvalid),
  });
}
