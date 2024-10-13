import { z } from "zod";

import { CHARACTERS, FONTS, THEMES } from "./constants";

export const createMessageSchema = z.object({
  theme: z.string().refine((theme) => THEMES.some((t) => t.value === theme)),
  character: z
    .string()
    .refine((character) => CHARACTERS.some((c) => c.value === character)),
});
export type CreateMessage = z.infer<typeof createMessageSchema>;

export const canvasMessageSchema = z.object({
  text: z.string().min(1).max(100),
  fontSize: z.number().min(8).max(64),
  positionX: z.number().min(0).max(512),
  positionY: z.number().min(0).max(512),
  fontId: z.string().refine((id) => FONTS.some((font) => font.id === id)),
});
export type CanvasMessage = z.infer<typeof canvasMessageSchema>;
