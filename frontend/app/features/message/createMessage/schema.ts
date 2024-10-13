import { z } from "zod";

export const createMessageSchema = z.object({
  message: z.string().min(1).max(100),
});
export type CreateMessage = z.infer<typeof createMessageSchema>;